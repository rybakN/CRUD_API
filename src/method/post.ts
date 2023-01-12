import { ServerResponse, IncomingMessage } from 'http';
import { MethodHandler } from './methodCombiner.js';
import { User, Users } from '../utils/users.js';
import { checkUser } from '../utils/checkUser.js';
import { createUserObj } from '../utils/createUserObj.js';
import { HttpStatusCode } from '../utils/httpStatusCode.js';
import { setResponse } from '../utils/setResponse.js';
import * as responseMsg from '../utils/msgForResponse.js';

export class Post implements MethodHandler {
  static nameMethod = 'POST';

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
        const user: User | null = createUserObj(body);

        if (!checkUser(user)) {
          setResponse(resp, HttpStatusCode.BAD_REQUEST, responseMsg.invalidBody(HttpStatusCode.BAD_REQUEST));
        } else {
          Users.set(user!.id, user!);
          setResponse(resp, HttpStatusCode.CREATE_USER, JSON.stringify(user));
        }
      } catch (e) {
        setResponse(resp, HttpStatusCode.INTERNAL_SERVER, responseMsg.internalServer(HttpStatusCode.INTERNAL_SERVER));
      }
    });
  }
}
