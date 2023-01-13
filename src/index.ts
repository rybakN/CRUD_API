import { startMultiCore } from './multiCore/multiCore.js';
import { startOneCore } from './oneCore/oneCore.js';

if (process.env.START_ENV === 'multiCore') {
  startMultiCore();
} else startOneCore();
