import cluster from 'cluster';
import * as dotenv from 'dotenv';
import { masterProcess } from './master.js';
import { workerProcess } from './worker.js';

dotenv.config();

export const startMultiCore = () => {
  if (cluster.isPrimary) {
    masterProcess(process.env.SERVER_PORT!);
  } else {
    workerProcess(process.env.SERVER_PORT!);
  }
};
