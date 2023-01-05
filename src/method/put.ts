import { MethodHandler } from './methodCombiner.js';
import { ServerResponse, IncomingMessage } from 'http';
import { User, Users } from '../utils/users.js';
import { checkUser } from '../utils/checkUser.js';
import { createUserObj } from '../utils/createUserObj.js';
import { parseUrl } from '../utils/parseUrl.js';

export class Put implements MethodHandler {
  static nameMethod = 'PUT';

  public handler(resp: ServerResponse, req: IncomingMessage) {
    let body: string = '';

    req.on('data', (data) => {
      body += data.toString();
    });

    req.on('end', () => {
      const userId: string = parseUrl(req.url!)[3];

      if (userId.length) {
        if (Users.has(userId)) {
          const user: User | null = createUserObj(body, userId);

          if (checkUser(user!)) {
            Users.set(userId, user!);
            console.log(Users.get(userId));
            resp.statusCode = 200;
            resp.setHeader('Content-type', 'JSON');
            resp.end(JSON.stringify(user));
          } else {
            resp.statusCode = 400;
            resp.setHeader('Content-type', 'text/html');
            resp.end(`<h1>Invalid BODY</h1>`);
          }
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
    });
  }
}
