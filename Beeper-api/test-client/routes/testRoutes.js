const express = require('express');
const axios = require('axios');
const router = express.Router();

const {
  USER_SERVICE_URL,
  ROLE_SERVICE_URL,
  MESSAGE_SERVICE_URL,
  GROUP_SERVICE_URL,
  NOTIFICATION_SERVICE_URL,
  LOGGING_SERVICE_URL,
  MONITORING_SERVICE_URL
} = process.env;

router.get('/users', async (req, res) => {
  try {
    const response = await axios.get(`${USER_SERVICE_URL}/api/users`);
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ message: error.message });
  }
});

router.post('/users/register', async (req, res) => {
  try {
    const response = await axios.post(`${USER_SERVICE_URL}/api/users/register`, req.body);
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ message: error.message });
  }
});

router.post('/roles', async (req, res) => {
  try {
    const response = await axios.post(`${ROLE_SERVICE_URL}/api/roles`, req.body, {
      headers: { Authorization: req.headers.authorization }
    });
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ message: error.message });
  }
});

router.post('/messages', async (req, res) => {
  try {
    const response = await axios.post(`${MESSAGE_SERVICE_URL}/api/messages`, req.body, {
      headers: { Authorization: req.headers.authorization }
    });
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ message: error.message });
  }
});

router.post('/groups', async (req, res) => {
  try {
    const response = await axios.post(`${GROUP_SERVICE_URL}/api/groups`, req.body, {
      headers: { Authorization: req.headers.authorization }
    });
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ message: error.message });
  }
});

router.post('/notifications', async (req, res) => {
  try {
    const response = await axios.post(`${NOTIFICATION_SERVICE_URL}/api/notifications`, req.body, {
      headers: { Authorization: req.headers.authorization }
    });
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ message: error.message });
  }
});

router.post('/logs', async (req, res) => {
  try {
    const response = await axios.post(`${LOGGING_SERVICE_URL}/api/logs`, req.body, {
      headers: { Authorization: req.headers.authorization }
    });
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ message: error.message });
  }
});

router.get('/metrics', async (req, res) => {
  try {
    const response = await axios.get(`${MONITORING_SERVICE_URL}/api/metrics`);
    res.send(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ message: error.message });
  }
});

module.exports = router;