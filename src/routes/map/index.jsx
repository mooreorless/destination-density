import React from 'react';
import server from 'react-dom/server';

import Twitter from 'twitter';
import View from './view';


/**
 * gets the credentials for twitter.
 */
const twitterConfig = require('../../twitter_config.json');

const twitter = new Twitter({
  consumer_key: twitterConfig.consumer_key,
  consumer_secret: twitterConfig.consumer_secret,
  access_token_key: twitterConfig.access_token_key,
  access_token_secret: twitterConfig.access_token_secret
});

/**
 * the map route.
 */
export const map = ctx => {

  /** TODO: this needs to be utilised. */
  // twitter.stream('statuses/filter', {track: 'travel'}, (stream) => {
  //   stream.on('data', (event) => {
  //     console.log(event && event.text);
  //   });
  //
  //   stream.on('error', (error) => {
  //     throw error;
  //   });
  // });

  return new Promise(resolve => {
    twitter.get('search/tweets', {q: 'olympics' }, (err, tweets, res) => {
      if (err) {
        console.log(err);
      } else {
        console.log(tweets);

        const statuses = tweets.statuses;
        const props = { statuses };

        ctx.body = server.renderToStaticMarkup(<View {...props} />);
        resolve();
      }
    });
  })
}

export default map;
