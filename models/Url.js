const mongoose = require('mongoose');

const UrlSchema = new mongoose.Schema({
  originalUrl: { type: String },
  urlCode: { type: String, unique: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  count: { type: Number, default: 0 },
});

module.exports = mongoose.model('Url', UrlSchema);
