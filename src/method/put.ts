import { MethodHandler } from './methodCombiner.js';
import { ServerResponse, IncomingMessage } from 'http';
import { User, Users } from '../utils/users.js';
import { checkUser } from '../utils/checkUser.js';
import { createUserObj } from '../utils/createUserObj.js';
import { parseUrl } from '../utils/parseUrl.js';
import { HttpStatusCode } from '../utils/httpStatusCode.js';

export class Put implements MethodHandler {
  static nameMethod = 'PUT';

  public handler(resp: ServerResponse, req: IncomingMessage): void {
    let body: string = '';

    req.on('data', (data) => {
      try {
        body += data.toString();
      } catch (e) {
        resp.statusCode = HttpStatusCode.INTERNAL_SERVER;
        resp.setHeader('Content-type', 'text/html');
        resp.end(`<h1>INTERNAL_SERVER</h1>`);
      }
    });

    req.on('end', () => {
      try {
        const userId: string = parseUrl(req.url!)[3];
        if (!userId.length) {
          if (Users.has(userId)) {
            const user: User | null = createUserObj(body, userId);
            if (checkUser(user!)) {
              Users.set(userId, user!);
              resp.statusCode = HttpStatusCode.OK;
              resp.setHeader('Content-type', 'JSON');
              resp.end(JSON.stringify(user));
            } else {
              resp.statusCode = HttpStatusCode.BAD_REQUEST;
              resp.setHeader('Content-type', 'text/html');
              resp.end(`<h1>Invalid BODY</h1>`);
            }
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
    });
  }
}
