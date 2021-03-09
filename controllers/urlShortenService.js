const Url = require('../models/Url');
const urlUtil = require('../utils/urlUtil');

exports.shortOriginalUrl = async (req, res) => {
  // eslint-disable-next-line no-var
  var { originalUrl, urlCode } = req.body;

  if (urlUtil.isValidUrl(originalUrl) === false) {
    return res.status(400).json('Invalid Url Format');
  }

  if (urlCode === undefined) {
    urlCode = urlUtil.uniqueCodeGenerate();
  }

  try {
    const existingUrl = await Url.findOne({ urlCode });

    if (existingUrl !== null) {
      return res.status(400).json('Url Code Already Taken');
    }

    const urlToBeShortened = { originalUrl, urlCode };
    const url = new Url(urlToBeShortened);
    const generatedUrl = await url.save();
    return res.status(201).json({
      generatedUrl,
    });
  } catch (err) {
    // TODO: Error handling for error.
    return res.status(500).json('Internal Server Error');
  }
};

exports.getOriginalUrl = async (req, res) => {
  try {
    const { urlCode } = req.params;
    const url = await Url.findOne({ urlCode });

    if (url === null) {
      // TODO: Redirect to a error page.
    }

    url.count += 1;
    await url.save();
    const { originalUrl } = url;

    return res.redirect(originalUrl);
  } catch (err) {
    // TODO: Error handling for error.
    return res.status(500).json('Internal Server Error');
  }
};
