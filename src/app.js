import 'babel-polyfill';

import Koa from 'koa';

import router from './routes';

/** @type {Koa} app the koa server */
const app = new Koa();


/** apply middleware and routes */
app
  .use(router.routes())
  .use(router.allowedMethods());


export default app;
