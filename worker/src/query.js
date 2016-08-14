/**
 * queries twitter for tweets related to a country
 */
export const query = (twitter, name) => {
  return new Promise(resolve => {
    console.log(`makging query for tweets related to: ${name}`)

    twitter.get('search/tweets', { q: name }, (error, tweets) => {
      if (error) throw error;
      resolve(tweets.statuses);
    });
  });
}

export default query;
