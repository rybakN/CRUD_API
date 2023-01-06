import * as dotenv from 'dotenv';
import * as http from 'http';
import { MethodCombiner } from './method/methodCombiner.js';
import { ServerResponse } from 'http';
import { checkURL } from './utils/checkURL.js';
import { setResponse } from './utils/setResponse.js';
import { HttpStatusCode } from './utils/httpStatusCode.js';
import * as responseMsg from './utils/msgForResponse.js';
dotenv.config();

const server = http.createServer((request: http.IncomingMessage, response: ServerResponse) => {
  if (!checkURL(request.url!)) {
    setResponse(response, HttpStatusCode.NOT_FOUND, responseMsg.userExist(HttpStatusCode.NOT_FOUND, request.url!));
    return;
  }

  const methodCombiner = new MethodCombiner();
  methodCombiner.handlerReq(response, request);

  process.on('uncaughtException', (error) => {
    setResponse(response, HttpStatusCode.INTERNAL_SERVER, responseMsg.internalServer(HttpStatusCode.INTERNAL_SERVER));
  });
});

server.listen(process.env.SERVER_PORT, () => {
  console.log(`--- server start at port ${process.env.SERVER_PORT} ---`);
});
