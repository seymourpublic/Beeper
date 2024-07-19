const mongoose = require('mongoose');

const logSchema = new mongoose.Schema({
  level: {
    type: String,
    required: true,
    enum: ['info', 'warn', 'error'],
  },
  message: {
    type: String,
    required: true,
  },
  meta: {
    type: Object,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const Log = mongoose.model('Log', logSchema);
module.exports = Log;