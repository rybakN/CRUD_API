import { Worker } from 'cluster';

export const balancer = (workers: Worker[], PORT: string): number => {
  let curWorker = Number(process.env.curWorker);
  const workersId: number[] = [];
  for (let i = 0; i < workers.length; i++) {
    workersId.push(Number(workers[i].id));
  }
  if (!curWorker && curWorker != 0) {
    process.env.curWorker = '0';
    console.log(workersId);
    return Number(PORT) + workersId[0];
  }

  const nextWorker = curWorker + 1;

  if (nextWorker < workersId.length) {
    process.env.curWorker = nextWorker.toString();
    return Number(PORT) + workersId[nextWorker];
  } else {
    process.env.curWorker = '0';
    return Number(PORT) + workersId[0];
  }
};
