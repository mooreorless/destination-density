import 'babel-polyfill';

import { databaseInit } from './database';
import worker from './worker';

/** database address */
const IP = process.argv[2] || '127.0.0.1';
const PORT = process.argv[3] || '27017';

/** connect to database then start worker */
databaseInit(`${IP}:${PORT}`).then(worker);
