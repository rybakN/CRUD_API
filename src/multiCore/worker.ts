import cluster from 'cluster';
import { server } from '../server.js';
import { getWorkerBD, updateBD } from './updateBD.js';

export const workerProcess = (PORT: string) => {
  console.log(`Worker ${process.pid} started`);
  const _PORT: string = Number(PORT) + Number(cluster.worker?.id) + '';
  server.listen(_PORT);

  process.on('message', (message: string) => {
    if (message === 'getDB') {
      getWorkerBD();
    } else {
      updateBD(message);
    }
  });
};
