const express = require('express');

const router = express.Router();
const urlShortenService = require('../controllers/urlShortenService');

router.get('/urlService/:urlCode', urlShortenService.getOriginalUrl);

router.post('/urlService/', urlShortenService.shortOriginalUrl);

module.exports = router;
