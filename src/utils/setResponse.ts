import { ServerResponse } from 'http';
import { HttpStatusCode } from './httpStatusCode.js';

export const setResponse = (resp: ServerResponse, HttpStatusCode: HttpStatusCode, end: string): void => {
  resp.statusCode = HttpStatusCode;
  resp.setHeader('Content-type', 'application/json');
  resp.end(end);
};
