const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
require('dotenv').config();

const routes = require('./routes/index');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { limiter } = require('./middlewares/limiter');
const { cors } = require('./middlewares/cors');

const {
  PORT = 3000,
  MONGO_URI = 'mongodb://localhost:27017/mestodb',
} = process.env;

const { handleStartServerConsole, handleAppError, sendError } = require('./helpers/utils');
const { mongooseOptions } = require('./helpers/constants');

try {
  const app = express();
  mongoose.connect(MONGO_URI, mongooseOptions).catch(handleAppError);

  app.use(requestLogger);
  app.use(limiter);
  app.use(cors);

  app.use(helmet());
  app.use(bodyParser.json());
  app.use(cookieParser());

  app.use(routes);

  app.use(errorLogger);
  app.use(errors()); // celebrate errors handle
  app.use(sendError); // send others error

  app.listen(PORT, handleStartServerConsole(PORT));
} catch (err) {
  handleAppError(err);
}
