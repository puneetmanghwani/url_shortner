const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const urlRoutes = require('./routes/urlShorten');
const constants = require('./configs/constants');

const app = express();
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cookieParser());

app.use('/api', urlRoutes);

mongoose
  .connect(
    constants.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true },
  )
  .then(() => {
    app.listen(process.env.PORT || 8000);
  })
  .catch((err) => {
    console.log(err);
  });
