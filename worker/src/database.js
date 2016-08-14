import mongoose from 'mongoose';

/** use native promises with mongo */
mongoose.Promise = global.Promise;

/**
 * @param {string} address the database address.
 */
export const databaseInit = address => {
  return new Promise(resolve => {
    console.log(`connecting to database at: ${address}`)
    mongoose.connect(`mongodb://${address}/seamless`);
    database.on('error', console.error);
    database.once('open', error => {
      if (error) throw error;
      resolve();
    });
  });
}

/** @type {Connection} db a mongoose connection */
export const database = mongoose.connection;
export default database;
