import { ServerResponse, IncomingMessage } from 'http';
import { MethodHandler } from './methodCombiner.js';
import { User, Users } from '../utils/users.js';
import { checkUser } from '../utils/checkUser.js';
import { createUserObj } from '../utils/createUserObj.js';
import { HttpStatusCode } from '../utils/httpStatusCode.js';

export class Post implements MethodHandler {
  static nameMethod = 'POST';

  public handler(resp: ServerResponse, req: IncomingMessage) {
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
        const user: User | null = createUserObj(body);

        if (checkUser(user)) {
          Users.set(user!.id, user!);
          resp.statusCode = HttpStatusCode.CREATE_USER;
          resp.setHeader('Content-type', 'JSON');
          resp.end(JSON.stringify(user));
        } else {
          resp.statusCode = HttpStatusCode.BAD_REQUEST;
          resp.setHeader('Content-type', 'text/html');
          resp.end(`<h1>Invalid BODY</h1>`);
        }
      } catch (e) {
        resp.statusCode = HttpStatusCode.INTERNAL_SERVER;
        resp.setHeader('Content-type', 'text/html');
        resp.end(`<h1>INTERNAL_SERVER</h1>`);
      }
    });
  }
}
