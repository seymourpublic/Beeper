const Notification = require('../models/Notification');

// Get notifications for a user
const getUserNotifications = async (req, res) => {
  const notifications = await Notification.find({ recipientId: req.user.id });

  res.json(notifications);
};

// Mark notification as read
const markAsRead = async (req, res) => {
  const notification = await Notification.findById(req.params.id);

  if (notification) {
    notification.readStatus = true;
    await notification.save();
    res.json({ message: 'Notification marked as read', notification });
  } else {
    res.status(404).json({ message: 'Notification not found' });
  }
};

module.exports = { getUserNotifications, markAsRead };