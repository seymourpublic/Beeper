const Log = require('../models/Log');

// Create a log
const createLog = async (req, res) => {
  const { level, message, meta } = req.body;

  const log = new Log({
    level,
    message,
    meta,
  });

  await log.save();

  res.status(201).json({ message: 'Log created', log });
};

// Get logs
const getLogs = async (req, res) => {
  const logs = await Log.find({});
  res.json(logs);
};

module.exports = { createLog, getLogs };