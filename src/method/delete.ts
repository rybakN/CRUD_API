import { MethodHandler } from './methodCombiner.js';
import { ServerResponse, IncomingMessage } from 'http';

export class Delete implements MethodHandler {
  static nameMethod = 'DELETE';

  public handler(resp: ServerResponse, req: IncomingMessage) {}
}
