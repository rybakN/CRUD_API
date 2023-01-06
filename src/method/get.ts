import { MethodHandler } from './methodCombiner.js';
import { ServerResponse, IncomingMessage } from 'http';
import { getAllUsers, User, Users } from '../utils/users.js';
import { parseUrl } from '../utils/parseUrl.js';
import { HttpStatusCode } from '../utils/httpStatusCode.js';

export class Get implements MethodHandler {
  static nameMethod = 'GET';

  public handler(resp: ServerResponse, req: IncomingMessage) {
    const urlArr: string[] = parseUrl(req.url!);

    if (urlArr.length === 3) {
      const allUsers = getAllUsers();
      resp.statusCode = HttpStatusCode.OK;
      resp.setHeader('Content-type', 'JSON');
      resp.end(JSON.stringify(allUsers));
    } else if (urlArr[3] !== '') {
      const user = this.getUser(urlArr[3]);
      if (user) {
        resp.statusCode = HttpStatusCode.OK;
        resp.setHeader('Content-type', 'JSON');
        resp.end(JSON.stringify(user));
      } else {
        resp.statusCode = HttpStatusCode.NOT_FOUND;
        resp.setHeader('Content-type', 'text/html');
        resp.end(`<h1>User with id: ${urlArr[3]} doesn't exist</h1>`);
      }
    } else {
      resp.statusCode = HttpStatusCode.BAD_REQUEST;
      resp.setHeader('Content-type', 'text/html');
      resp.end(`<h1>Invalid ID</h1>`);
    }
  }

  private getUser(userId: string): User | undefined {
    return Users.get(userId);
  }
}
