/**
 * This is the router for to expose all methods available to shipment data.
 */
import router from 'koa-router';

import search from './search';
import results from './results';


const mainRouter = router();

/**
 * attach routes here.
 */
mainRouter
  .get('/results', results)
  .get('/', search);


/**
 * the default export (the endpoint).
 */
export default mainRouter;
