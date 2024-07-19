const Message = require('../models/Message');

// Send a message
const sendMessage = async (req, res) => {
  const { content, recipientId, groupId } = req.body;

  const message = new Message({
    content,
    senderId: req.user.id,
    recipientId,
    groupId,
  });

  await message.save();

  res.status(201).json({ message: 'Message sent', message });
};

// Get messages for a user
const getUserMessages = async (req, res) => {
  const messages = await Message.find({
    $or: [{ senderId: req.user.id }, { recipientId: req.user.id }],
  });

  res.json(messages);
};

// Get messages for a group
const getGroupMessages = async (req, res) => {
  const messages = await Message.find({ groupId: req.params.groupId });

  res.json(messages);
};

module.exports = { sendMessage, getUserMessages, getGroupMessages };