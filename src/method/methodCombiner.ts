import { ServerResponse } from 'http';
import { Get } from './get.js';
import * as http from 'http';
import { Put } from './put.js';
import { Post } from './post.js';
import { Delete } from './delete.js';
import { HttpStatusCode } from '../utils/httpStatusCode.js';

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

  public handlerReq(resp: ServerResponse, req: http.IncomingMessage) {
    console.log(req.method);
    try {
      const handler = this.method.get(req.method!);
      if (handler) {
        handler.handler(resp, req);
      } else {
        resp.statusCode = HttpStatusCode.NOT_FOUND;
        resp.setHeader('Content-type', 'text/html');
        resp.end(`${req.method} method is not processed`);
      }
    } catch (e) {
      resp.statusCode = HttpStatusCode.INTERNAL_SERVER;
      resp.setHeader('Content-type', 'text/html');
      resp.end(`<h1>INTERNAL_SERVER</h1>`);
    }
  }
}
