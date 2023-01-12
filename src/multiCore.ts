import cluster from 'cluster';
import * as dotenv from 'dotenv';
import { masterProcess } from './multiCore/master.js';
import { workerProcess } from './multiCore/worker.js';

dotenv.config();

if (cluster.isPrimary) {
  masterProcess(process.env.SERVER_PORT!);
} else {
  workerProcess(process.env.SERVER_PORT!);
}
