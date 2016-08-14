import database from './database'
import twitter from './twitter';
import query from './query';

import { country } from './models';

/** import search data */
const locations = require('./location_set.json');

export const worker = () => {
  console.log('worker started. beginning to collect tweet counts.')

  /** register models */
  const Country = country(database);

  let [i, length] = [0, locations.length];
  setInterval(() => {
    const name = locations[i];

    /** query twitter */
    query(twitter, name)
      .then(async tweets => {
        const count = tweets.length

        try {
          /** find by name, and update count */
          await Country.findOneAndUpdate({ name }, { count });

          /** update counter */
          if (++i === length) i = 0;

          console.log(`saved the ${name} document with a count of: ${count} tweets.`);
        } catch (error) {
          console.error(error);
        }
      })
  }, 5000);
}

export default worker;
