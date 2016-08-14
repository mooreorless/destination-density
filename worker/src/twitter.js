import Twitter from 'twitter';
const credentials = require('./twitter_config.json');

export const twitter = new Twitter(credentials);
export default twitter;
