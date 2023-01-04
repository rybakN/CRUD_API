import { ServerResponse, IncomingMessage } from 'http';
import { v4 as uuidv4 } from 'uuid';
import { MethodHandler } from './methodCombiner.js';
import { parseUrl } from '../parseUrl.js';
import { User } from '../users.js';

export class Post implements MethodHandler {
  static nameMethod = 'POST';

  public handler(resp: ServerResponse, req: IncomingMessage) {
    const urlArr: string[] = parseUrl(req.url!);

    if (urlArr.length === 3) {
      let body: any = '';
      req.on('data', (data) => {
        body += data;
        console.log(body);
      });
      resp.statusCode = 400;
      resp.setHeader('Content-type', 'text/html');
      resp.end(body);
    } else {
      resp.statusCode = 404;
      resp.setHeader('Content-type', 'text/html');
      resp.end(`<h1>Invalid rout</h1>`);
    }
  }
}
