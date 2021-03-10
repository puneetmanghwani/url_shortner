const { nanoid } = require('nanoid');

module.exports = {
  uniqueCodeGenerateByNanoId() {
    return nanoid(5);
  },
  uniqueCodeGenerateManually() {
    const mask = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    // eslint-disable-next-line no-var
    var result = '';
    // eslint-disable-next-line no-var
    var i;
    const length = 6;
    for (i = length; i > 0; i -= 1) {
      result += mask[Math.floor(Math.random() * mask.length)];
    }
    return result;
  },
  isValidUrl(url) {
    const pattern = new RegExp('^(https?:\\/\\/)?' // protocol
          + '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' // domain name
          + '((\\d{1,3}\\.){3}\\d{1,3}))' // OR ip (v4) address
          + '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' // port and path
          + '(\\?[;&a-z\\d%_.~+=-]*)?' // query string
          + '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
    return pattern.test(url);
  },
};
