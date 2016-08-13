/**
 * This is the router for to expose all methods available to shipment data.
 */
import router from 'koa-router';

// TODO: add a query route
import map from './map';

const mainRouter = router();


/**
 * attach routes here.
 */
mainRouter
  .get('/', map);


/**
 * the default export (the endpoint).
 */
export default mainRouter;
