import fs from 'fs/promises';
import path from 'path';

const rmDist = async () => {
  const pathToDist = path.resolve('./dist');
  fs.rm(pathToDist, { recursive: true }).then(
    () => {
      process.exit(0);
    },
    (err) => console.log('!!! No such directory dist !!!'),
  );
};

await rmDist();
