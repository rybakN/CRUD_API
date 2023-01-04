import { ServerResponse } from 'http';
import { Get } from './get.js';
import * as http from 'http';
import { Put } from './put.js';
import { Post } from './post.js';
import { Delete } from './delete.js';

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
    const handler = this.method.get(req.method!);
    if (handler) {
      handler.handler(resp, req);
    } else {
      resp.statusCode = 404;
      resp.setHeader('Content-type', 'text/html');
      resp.end(`${req.method} method is not processed`);
    }
  }
}
