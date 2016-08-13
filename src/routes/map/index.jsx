import React from 'react';
import server from 'react-dom/server';

import Twitter from 'twitter';
import View from './view';


const twitter = new Twitter();
/**
 * gets the credentials for twitter.
 */
const twitterConfig = require('../../twitter_config.json');

/**
 * the map route.
 */
export const map = ctx => {

  /** TODO: this needs to be utilised. */
  twitter.stream('statuses/filter', {track: 'travel'}, (stream) => {
    stream.on('data', (event) => {
      console.log(event && event.text);
    });

    stream.on('error', (error) => {
      throw error;
    });
  });

  const props = {};

  ctx.body = server.renderToStaticMarkup(<View {...props} />);
}

export default map;
