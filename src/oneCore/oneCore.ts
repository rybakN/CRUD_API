import { server } from '../server/server.js';
import * as dotenv from 'dotenv';
dotenv.config();
export const startOneCore = () => {
  server.listen(process.env.SERVER_PORT, () => {
    console.log(`--- server start at port ${process.env.SERVER_PORT} ---`);
  });
};
