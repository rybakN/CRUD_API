import { MethodHandler } from './methodCombiner.js';
import { ServerResponse, IncomingMessage } from 'http';
import { parseUrl } from '../utils/parseUrl.js';
import { Users } from '../utils/users.js';
import { HttpStatusCode } from '../utils/httpStatusCode.js';
import { setResponse } from '../utils/setResponse.js';
import * as responseMsg from '../utils/msgForResponse.js';

export class Delete implements MethodHandler {
  static nameMethod = 'DELETE';

  public handler(resp: ServerResponse, req: IncomingMessage) {
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

      Users.delete(userId);
      setResponse(resp, HttpStatusCode.DELETE_USER, responseMsg.deleteUser(HttpStatusCode.DELETE_USER, userId));
    } catch (e) {
      setResponse(resp, HttpStatusCode.INTERNAL_SERVER, responseMsg.internalServer(HttpStatusCode.INTERNAL_SERVER));
    }
  }
}
