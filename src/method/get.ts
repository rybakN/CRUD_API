import { MethodHandler } from './methodCombiner.js';
import { ServerResponse, IncomingMessage } from 'http';
import { getAllUsers, User, Users } from '../users.js';
import { parseUrl } from '../parseUrl.js';

export class Get implements MethodHandler {
  static nameMethod = 'GET';

  public handler(resp: ServerResponse, req: IncomingMessage) {
    const urlArr: string[] = parseUrl(req.url!);

    if (urlArr.length === 3) {
      const allUsers = getAllUsers();
      resp.setHeader('Content-type', 'text/html');
      resp.end(JSON.stringify(allUsers));
    } else if (urlArr.length === 4 && urlArr[3] !== '') {
      const userId = urlArr[3];
      if (userId) {
        resp.statusCode = 200;
        resp.setHeader('Content-type', 'text/html');
        resp.end(JSON.stringify(userId));
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

  private getUser(userId: string): User | undefined {
    return Users.get(userId);
  }
}
