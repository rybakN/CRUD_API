import { ServerResponse } from 'http';
import { Get } from './get.js';
import * as http from 'http';
import { Put } from './put.js';
import { Post } from './post.js';
import { Delete } from './delete.js';
import { HttpStatusCode } from '../utils/httpStatusCode.js';
import { setResponse } from '../utils/setResponse.js';
import * as responseMsg from '../utils/msgForResponse.js';

export interface MethodHandler {
  handler: (resp: ServerResponse, req: http.IncomingMessage) => void;
}

export class MethodCombiner {
  private method: Map<string, MethodHandler> = new Map();

  public constructor() {
    this.method.set(Get.nameMethod, new Get());
    this.method.set(Delete.nameMethod, new Delete());
    this.method.set(Post.nameMethod, new Post());
    this.method.set(Put.nameMethod, new Put());
  }

  public handlerReq(resp: ServerResponse, req: http.IncomingMessage): void {
    console.log(`Process #${process.pid}, Method: ${req.method}`);
    try {
      const handler = this.method.get(req.method!);
      if (handler) {
        handler.handler(resp, req);
      } else {
        setResponse(
          resp,
          HttpStatusCode.NOT_IMPLEMENTED,
          responseMsg.methodNotProcessed(HttpStatusCode.NOT_IMPLEMENTED, req.method!),
        );
      }
    } catch (e) {
      setResponse(resp, HttpStatusCode.INTERNAL_SERVER, responseMsg.internalServer(HttpStatusCode.INTERNAL_SERVER));
    }
  }
}
