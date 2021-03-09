require('dotenv').config();

const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const pino = require('pino');
const expressPino = require('express-pino-logger');
const urlRoutes = require('./routes/urlShorten');

const logger = pino({ level: process.env.LOG_LEVEL || 'info' });
const expressLogger = expressPino({ logger });

const app = express();
app.use(cors());
app.use(expressLogger);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cookieParser());

app.use('/api', urlRoutes);

const { mongoURI, serverPort } = process.env;
logger.info('Running on %d', serverPort);
mongoose
  .connect(
    mongoURI, { useNewUrlParser: true, useUnifiedTopology: true },
  )
  .then(() => {
    app.listen(serverPort);
  })
  .catch((err) => {
    console.log(err);
  });
