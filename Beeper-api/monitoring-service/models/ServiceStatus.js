const mongoose = require('mongoose');

const serviceStatusSchema = new mongoose.Schema({
  serviceName: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['UP', 'DOWN'],
    required: true,
  },
  lastChecked: {
    type: Date,
    default: Date.now,
  },
});

const ServiceStatus = mongoose.model('ServiceStatus', serviceStatusSchema);
module.exports = ServiceStatus;