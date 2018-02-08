const morgan = require('morgan');
const winston = require('winston');
const helmet = require('helmet');
const compression = require('compression');
const bodyParser = require('body-parser');
const cors = require('cors');

module.exports = (app) => {
  app.use(morgan('dev', { stream: { write: message => winston.info(message) } }));
  app.use(helmet());
  app.use(compression());
  app.use(bodyParser.json());
  app.use(cors());
};
