const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const Message = require('../models/Message');
const User = require('../models/User');

// POST /api/messages - Send a message
router.post('/', auth, async (req, res) => {
  try {
    const { receiverId, content } = req.body;
    if (!receiverId || !content) {
      return res.status(400).json({ msg: 'Please provide receiverId and content' });
    }

    const newMessage = new Message({
      senderId: req.user.userId,
      receiverId,
      content
    });
    
    await newMessage.save();
    res.status(201).json(newMessage);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// GET /api/messages/contacts - Get a list of users to chat with
router.get('/contacts', auth, async (req, res) => {
  try {
    const myId = req.user.userId;
    // Fetch users and attach live message stats
    let users = await User.find({ _id: { $ne: myId } }).select('-password').lean();

    for (let u of users) {
      const latestMsg = await Message.findOne({
        $or: [
          { senderId: myId, receiverId: u._id },
          { senderId: u._id, receiverId: myId }
        ]
      }).sort({ createdAt: -1 });

      u.latestMessageDate = latestMsg ? latestMsg.createdAt : new Date(0);

      const unreadCount = await Message.countDocuments({
        senderId: u._id,
        receiverId: myId,
        isRead: false
      });
      u.unreadCount = unreadCount;
    }

    // Sort by most recent message first
    users.sort((a, b) => b.latestMessageDate - a.latestMessageDate);

    res.json(users);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// GET /api/messages/:userId - Get conversation with specific user
router.get('/:userId', auth, async (req, res) => {
  try {
    const otherUserId = req.params.userId;
    const myId = req.user.userId;

    const messages = await Message.find({
      $or: [
        { senderId: myId, receiverId: otherUserId },
        { senderId: otherUserId, receiverId: myId }
      ]
    }).sort({ createdAt: 1 });

    // Auto-mark read when fetching
    await Message.updateMany(
      { senderId: otherUserId, receiverId: myId, isRead: false },
      { $set: { isRead: true } }
    );

    res.json(messages);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
