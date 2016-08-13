import app from './app';

/** @type {number} [port=3000] the port the server will running on */
const port = process.env.PORT || 3000;

/** start server */
app.listen(port, () =>
  console.log(`the seamless server app is running on ${port}.`)
);
