import { MethodHandler } from './methodCombiner.js';
import { ServerResponse, IncomingMessage } from 'http';
import { getAllUsers, User, Users } from '../utils/users.js';
import { parseUrl } from '../utils/parseUrl.js';
import { HttpStatusCode } from '../utils/httpStatusCode.js';
import { setResponse } from '../utils/setResponse.js';
import * as responseMsg from '../utils/msgForResponse.js';

export class Get implements MethodHandler {
  static nameMethod = 'GET';

  public handler(resp: ServerResponse, req: IncomingMessage) {
    const urlArr: string[] = parseUrl(req.url!);

    if (urlArr.length === 3) {
      const allUsers = getAllUsers();
      setResponse(resp, HttpStatusCode.OK, JSON.stringify(allUsers));
    } else if (urlArr[3] !== '') {
      const user = this.getUser(urlArr[3]);
      if (!user) {
        setResponse(resp, HttpStatusCode.NOT_FOUND, responseMsg.userExist(HttpStatusCode.NOT_FOUND, urlArr[3]));
        return;
      }
      setResponse(resp, HttpStatusCode.OK, JSON.stringify(user));
    } else {
      setResponse(resp, HttpStatusCode.BAD_REQUEST, responseMsg.invalidId(HttpStatusCode.BAD_REQUEST));
    }
  }

  private getUser(userId: string): User | undefined {
    return Users.get(userId);
  }
}
