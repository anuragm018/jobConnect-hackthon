const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const CollabRequest = require('../models/CollabRequest');

// GET /api/collab - Get all collab requests
router.get('/', auth, async (req, res) => {
  try {
    const requests = await CollabRequest.find()
      .populate('authorId', 'name title role avatar')
      .sort({ createdAt: -1 });
    res.json(requests);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// POST /api/collab - Create a new collab request
router.post('/', auth, async (req, res) => {
  try {
    const { type, content } = req.body;
    
    if (!type || !content) {
      return res.status(400).json({ msg: 'Please provide type and content' });
    }

    const newRequest = new CollabRequest({
      authorId: req.user.userId,
      type,
      content
    });

    await newRequest.save();
    
    // Return the populated new request
    const populatedReq = await CollabRequest.findById(newRequest._id)
      .populate('authorId', 'name title role avatar');
      
    res.status(201).json(populatedReq);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
