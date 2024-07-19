const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  senderId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  recipientUserId: {
    type: mongoose.Schema.Types.ObjectId,
    required: false,
  },
  recipientGroupId: {
    type: mongoose.Schema.Types.ObjectId,
    required: false,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  readStatus: {
    type: Boolean,
    default: false,
  },
});

const Message = mongoose.model('Message', messageSchema);
module.exports = Message;