import { server } from './server.js';
import * as dotenv from 'dotenv';
dotenv.config();
server.listen(process.env.SERVER_PORT, () => {
  console.log(`--- server start at port ${process.env.SERVER_PORT} ---`);
});
