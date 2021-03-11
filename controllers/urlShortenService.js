const pino = require('pino');
const path = require('path');

const logger = pino({ level: process.env.LOG_LEVEL || 'info' });

const Url = require('../models/Url');
const urlUtil = require('../utils/urlUtil');

exports.shortOriginalUrl = async (req, res) => {
  var { originalUrl, urlCode } = req.body.params;

  logger.info(`Generating Short Url Code for ${originalUrl} with urlCode given by user: ${urlCode}`);

  // Checking if the url given by user is valid.
  if (urlUtil.isValidUrl(originalUrl) === false) {
    logger.error(`Orginal Url : ${originalUrl} .It is not a valid url.`);

    return res.status(400).json('Invalid Url Format');
  }

  // If url code is not given by user then generate it.
  if (urlCode === undefined || urlCode.length === 0) {
    // urlCode = urlUtil.uniqueCodeGenerateByNanoId();
    urlCode = urlUtil.uniqueCodeGenerateManually();

    // eslint-disable-next-line vars-on-top
    var existingUrlCode = await Url.findOne({ urlCode });

    // Generate a new url code till it is not present in database.
    while (existingUrlCode !== null) {
      urlCode = urlUtil.uniqueCodeGenerateManually();

      // eslint-disable-next-line no-await-in-loop
      existingUrlCode = await Url.findOne({ urlCode });
    }
  }

  try {
    const existingUrl = await Url.findOne({ urlCode });

    // If url code given by user exists in database.
    if (existingUrl !== null) {
      logger.error(`Url Code: ${urlCode} already taken`);

      return res.status(400).json('Url Code Already Taken');
    }

    const urlToBeShortened = { originalUrl, urlCode };

    const url = new Url(urlToBeShortened);
    const urlData = await url.save();

    logger.info(`Short Url Code generated for ${originalUrl} with urlCode: ${urlCode}`);

    return res.status(201).json({
      urlData,
    });
  } catch (err) {
    logger.error('Problem Occurred');

    return res.status(500).json('Internal Server Error');
  }
};

exports.getOriginalUrl = async (req, res) => {
  try {
    const { urlCode } = req.params;
    logger.info(`Finding original url for Url Code - ${urlCode}`);

    const url = await Url.findOne({ urlCode });

    if (url === null) {
      logger.error(`No Url found for Url Code - ${urlCode}`);

      return res.sendFile(path.resolve('templates', '404.html'));
    }

    url.count += 1;
    await url.save();

    const { originalUrl } = url;

    logger.info(`Original Url found for Url Code - ${urlCode}`);

    return res.redirect(originalUrl);
  } catch (err) {
    logger.error('Problem Occurred');

    return res.status(500).json('Internal Server Error');
  }
};
