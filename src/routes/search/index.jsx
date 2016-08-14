import React from 'react';
import server from 'react-dom/server';

import View from './view';


/**
 * gets the credentials for twitter.
 */
const location_set = require('../../location_set.json');

/**
 * the map route.
 */
export const search = ctx => {
    const props = { countries: location_set };
    ctx.body = server.renderToStaticMarkup(<View {...props} />);
}

export default search;
