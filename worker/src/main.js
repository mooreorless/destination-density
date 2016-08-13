import mongoose from 'mongoose';

import app from './app';

/** start mongoose */
const db = mongoose.connect('mongodb://localhost/seamless');
const credentials = require('./twitter_config.json');
const locations = require('./location_set.json');

/**
 * on error...
 */
db.on('error', console.error);


/**
 * on success...
 */
db.once('on', () =>
  const twitter = new Twitter(credentials);

  const query = twitter => {

    client.post('statuses/update', {status: 'I Love Twitter'}, (error, tweet) => {
      if (error) throw error;
      console.log(tweet);  // Tweet body.
    });
    // twitter.stream('statuses/filter', {track: 'travel'}, (stream) => {
    //   stream.on('data', (event) => {
    //     console.log(event && event.text);
    //   });
    //
    //   stream.on('error', (error) => {
    //     throw error;
    //   });
    // });
  }

  const timeout = setInterval(queryTwitter, 600000);
);
