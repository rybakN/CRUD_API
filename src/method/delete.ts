import { MethodHandler } from './methodCombiner.js';
import { ServerResponse, IncomingMessage } from 'http';
import { parseUrl } from '../utils/parseUrl.js';
import { Users } from '../utils/users.js';

export class Delete implements MethodHandler {
  static nameMethod = 'DELETE';

  public handler(resp: ServerResponse, req: IncomingMessage) {
    const userId: string = parseUrl(req.url!)[3];

    if (userId.length) {
      if (Users.has(userId)) {
        Users.delete(userId);
        resp.statusCode = 204;
        resp.setHeader('Content-type', 'text/html');
        resp.end(`<h1>User with ID: ${userId} deleted</h1>`);
      } else {
        resp.statusCode = 404;
        resp.setHeader('Content-type', 'text/html');
        resp.end(`<h1>User with id: ${userId} doesn't exist</h1>`);
      }
    } else {
      resp.statusCode = 400;
      resp.setHeader('Content-type', 'text/html');
      resp.end(`<h1>Invalid ID</h1>`);
    }
  }
}
