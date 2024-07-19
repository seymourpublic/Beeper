const ServiceStatus = require('../models/ServiceStatus');
const client = require('prom-client');

const collectDefaultMetrics = client.collectDefaultMetrics;
collectDefaultMetrics({ timeout: 5000 });

// Create a status entry
const createStatus = async (req, res) => {
  const { serviceName, status } = req.body;

  const serviceStatus = new ServiceStatus({
    serviceName,
    status,
  });

  await serviceStatus.save();

  res.status(201).json({ message: 'Status created', serviceStatus });
};

// Get all statuses
const getStatuses = async (req, res) => {
  const statuses = await ServiceStatus.find({});
  res.json(statuses);
};

// Get Prometheus metrics
const getMetrics = async (req, res) => {
  res.set('Content-Type', client.register.contentType);
  res.end(await client.register.metrics());
};

module.exports = { createStatus, getStatuses, getMetrics };