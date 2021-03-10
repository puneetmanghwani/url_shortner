require('dotenv').config();

const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const pino = require('pino');

const urlRoutes = require('./routes/urlShorten');

const logger = pino({ level: process.env.LOG_LEVEL || 'info' });

const app = express();
app.use(cors());
app.use((req, res, done) => {
  logger.info(req.originalUrl);
  done();
});
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cookieParser());

app.use('/api', urlRoutes);

const { mongoURI, serverPort } = process.env;
mongoose
  .connect(
    mongoURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
  )
  .then(() => {
    logger.info('Server Started On Port : %d', serverPort);
    app.listen(serverPort);
  })
  .catch((err) => {
    throw err;
  });
