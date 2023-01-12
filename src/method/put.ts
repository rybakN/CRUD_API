import { MethodHandler } from './methodCombiner.js';
import { ServerResponse, IncomingMessage } from 'http';
import { User, Users } from '../utils/users.js';
import { checkUser } from '../utils/checkUser.js';
import { createUserObj } from '../utils/createUserObj.js';
import { parseUrl } from '../utils/parseUrl.js';
import { HttpStatusCode } from '../utils/httpStatusCode.js';
import { setResponse } from '../utils/setResponse.js';
import * as responseMsg from '../utils/msgForResponse.js';

export class Put implements MethodHandler {
  static nameMethod = 'PUT';

  public handler(resp: ServerResponse, req: IncomingMessage): void {
    let body: string = '';

    req.on('data', (data) => {
      try {
        body += data.toString();
      } catch (e) {
        setResponse(resp, HttpStatusCode.INTERNAL_SERVER, responseMsg.internalServer(HttpStatusCode.INTERNAL_SERVER));
      }
    });

    req.on('end', (): void => {
      try {
        const userId: string = parseUrl(req.url!)[3];
        if (!userId.length) {
          setResponse(resp, HttpStatusCode.BAD_REQUEST, responseMsg.invalidId(HttpStatusCode.BAD_REQUEST));
          return;
        }

        if (!Users.has(userId)) {
          setResponse(resp, HttpStatusCode.NOT_FOUND, responseMsg.userExist(HttpStatusCode.NOT_FOUND, userId));
          return;
        }

        const user: User | null = createUserObj(body, userId);

        if (!checkUser(user!)) {
          setResponse(resp, HttpStatusCode.BAD_REQUEST, responseMsg.invalidBody(HttpStatusCode.BAD_REQUEST));
          return;
        }

        Users.set(userId, user!);
        setResponse(resp, HttpStatusCode.OK, JSON.stringify(user));
      } catch (e) {
        setResponse(resp, HttpStatusCode.INTERNAL_SERVER, responseMsg.internalServer(HttpStatusCode.INTERNAL_SERVER));
      }
    });
  }
}
