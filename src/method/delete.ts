import { MethodHandler } from './methodCombiner.js';
import { ServerResponse, IncomingMessage } from 'http';
import { parseUrl } from '../utils/parseUrl.js';
import { Users } from '../utils/users.js';
import { HttpStatusCode } from '../utils/httpStatusCode.js';

export class Delete implements MethodHandler {
  static nameMethod = 'DELETE';

  public handler(resp: ServerResponse, req: IncomingMessage) {
    try {
      const userId: string = parseUrl(req.url!)[3];

      if (userId.length) {
        if (Users.has(userId)) {
          Users.delete(userId);
          resp.statusCode = HttpStatusCode.DELETE_USER;
          resp.setHeader('Content-type', 'text/html');
          resp.end(`<h1>User with ID: ${userId} deleted</h1>`);
        } else {
          resp.statusCode = HttpStatusCode.NOT_FOUND;
          resp.setHeader('Content-type', 'text/html');
          resp.end(`<h1>User with id: ${userId} doesn't exist</h1>`);
        }
      } else {
        resp.statusCode = HttpStatusCode.BAD_REQUEST;
        resp.setHeader('Content-type', 'text/html');
        resp.end(`<h1>Invalid ID</h1>`);
      }
    } catch (e) {
      resp.statusCode = HttpStatusCode.INTERNAL_SERVER;
      resp.setHeader('Content-type', 'text/html');
      resp.end(`<h1>INTERNAL_SERVER</h1>`);
    }
  }
}
