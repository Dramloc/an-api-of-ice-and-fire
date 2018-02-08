const express = require('express');
const winston = require('winston');

const config = require('./config');
const character = require('./character');
const house = require('./house');
const book = require('./book');

winston.cli();
winston.info('Server process starting');

const app = express();
const host = '0.0.0.0';
const port = process.env.PORT || 3000;

const errorHandler = require('./middleware/error-handler');
const notFound = require('./middleware/not-found');

config.express(app);
app.use('/api/v1/characters', character.router);
app.use('/api/v1/houses', house.router);
app.use('/api/v1/books', book.router);
app.use(errorHandler());
app.use(notFound());

app.listen(port, host, (error) => {
  if (error) {
    winston.error(`Unable to listen for connections on http://${host}:${port}`, error);
    process.exit(10);
  }
  winston.info(`Listening for connections on http://${host}:${port}`);
});

module.exports = app;
