import * as dotenv from 'dotenv';
import * as http from 'http';
import { MethodCombiner } from './method/methodCombiner.js';
import { ServerResponse } from 'http';
dotenv.config();

const server = http.createServer((request: http.IncomingMessage, response: ServerResponse) => {
  const methodCombiner = new MethodCombiner();
  if (request.url?.startsWith('/api/users')) {
    methodCombiner.handlerReq(response, request);
  } else {
    response.statusCode = 404;
    response.setHeader('Content-type', 'text/html');
    response.end(`<h1>Not found rout: ${request.url}</h1> <h1>404</h1>`);
  }
});

server.listen(process.env.SERVER_PORT, () => {
  console.log(`--- server start at port ${process.env.SERVER_PORT} ---`);
});
