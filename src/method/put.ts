import { MethodHandler } from './methodCombiner.js';
import { ServerResponse, IncomingMessage } from 'http';

export class Put implements MethodHandler {
  static nameMethod = 'PUT';

  public handler(resp: ServerResponse, req: IncomingMessage) {}
}
