import * as http from 'http';
import { MethodCombiner } from './method/methodCombiner.js';
import { ServerResponse } from 'http';
import { checkURL } from './utils/checkURL.js';
import { setResponse } from './utils/setResponse.js';
import { HttpStatusCode } from './utils/httpStatusCode.js';
import * as responseMsg from './utils/msgForResponse.js';

export const server = http.createServer((req: http.IncomingMessage, res: ServerResponse) => {
  if (!checkURL(req.url!)) {
    setResponse(res, HttpStatusCode.NOT_FOUND, responseMsg.userExist(HttpStatusCode.NOT_FOUND, req.url!));
    return;
  }

  const methodCombiner = new MethodCombiner();
  methodCombiner.handlerReq(res, req);

  process.on('uncaughtException', (error) => {
    setResponse(res, HttpStatusCode.INTERNAL_SERVER, responseMsg.internalServer(HttpStatusCode.INTERNAL_SERVER));
  });
});
