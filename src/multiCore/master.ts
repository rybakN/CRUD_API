import * as os from 'os';
import cluster, { Worker } from 'cluster';
import * as http from 'http';
import { loadBalancer } from './loadBalancer.js';
import { Users } from '../utils/users.js';
import { updateBD } from './updateBD.js';
import { stringifyMap } from './stringyfyMap.js';
import { setResponse } from '../utils/setResponse.js';
import { HttpStatusCode } from '../utils/httpStatusCode.js';
import * as responseMsg from '../utils/msgForResponse.js';

const workers: Worker[] = [];
export const masterProcess = (PORT: string): void => {
  const countCPUS = os.cpus();

  for (let i = 0; i < countCPUS.length; i++) {
    const worker: Worker = cluster.fork();
    workers.push(worker);
  }

  http
    .createServer((req: http.IncomingMessage, res: http.ServerResponse): void => {
      let postData = '';
      req.on('data', (chunk): void => {
        try {
          postData += chunk;
        } catch {
          setResponse(res, HttpStatusCode.INTERNAL_SERVER, responseMsg.internalServer(HttpStatusCode.INTERNAL_SERVER));
        }
      });
      req.on('end', (): void => {
        try {
          const _options = setOptions(req, PORT);
          const curWorker = findCurWorker(workers, _options.port - Number(PORT));

          curWorker.send(JSON.stringify(stringifyMap(Users)));

          http
            .request(_options, (response: http.IncomingMessage): void => {
              let dataContainer = '';
              response.on('data', (chunk: any): void => {
                dataContainer += chunk;
              });
              response.on('end', (): void => {
                res.setHeader('Content-type', 'application/json');
                res.statusCode = response.statusCode!;
                res.end(dataContainer);
                curWorker.send('getDB');
                curWorker.on('message', (msg: string): void => {
                  updateBD(msg);
                });
              });
            })
            .write(postData);
        } catch {
          setResponse(res, HttpStatusCode.INTERNAL_SERVER, responseMsg.internalServer(HttpStatusCode.INTERNAL_SERVER));
        }
      });

      req.on('error', (err) => {
        setResponse(res, HttpStatusCode.INTERNAL_SERVER, responseMsg.internalServer(HttpStatusCode.INTERNAL_SERVER));
      });
    })
    .listen(PORT, (): void => {
      console.log(`--- server start at port ${PORT} ---`);
    });
};

const setOptions = (
  req: http.IncomingMessage,
  PORT: string,
): { host: string; headers: http.IncomingHttpHeaders; method: string; path: string; port: number } => {
  return {
    host: 'localhost',
    headers: req.headers,
    method: req.method!,
    path: req.url!,
    port: loadBalancer(workers, PORT),
  };
};

const findCurWorker = (workers: Worker[], id: number): Worker => {
  return workers.find((worker: Worker) => worker.id === id)!;
};
