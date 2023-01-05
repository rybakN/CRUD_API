import { ServerResponse, IncomingMessage } from 'http';
import { MethodHandler } from './methodCombiner.js';
import { User, Users } from '../utils/users.js';
import { checkUser } from '../utils/checkUser.js';
import { createUserObj } from '../utils/createUserObj.js';

export class Post implements MethodHandler {
  static nameMethod = 'POST';

  public handler(resp: ServerResponse, req: IncomingMessage) {
    let body: string = '';

    req.on('data', (data) => {
      body += data.toString();
    });

    req.on('end', () => {
      const user: User | null = createUserObj(body);

      if (checkUser(user)) {
        Users.set(user!.id, user!);
        resp.statusCode = 201;
        resp.setHeader('Content-type', 'JSON');
        resp.end(JSON.stringify(user));
      } else {
        resp.statusCode = 400;
        resp.setHeader('Content-type', 'text/html');
        resp.end(`<h1>Invalid BODY</h1>`);
      }
    });
  }
}
