const express = require('express');
const router = express.Router();
const User = require('../models/User');
const auth = require('../middleware/authMiddleware');

// @route   GET /api/users/workers
// @desc    Get all workers for the Home/Discovery feed
router.get('/workers', async (req, res) => {
  try {
    const workers = await User.find({ role: 'worker' }).select('-password');
    res.json(workers);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server Error fetching workers' });
  }
});

// @route   GET /api/users/search
// @desc    Search all users globally
router.get('/search', auth, async (req, res) => {
  try {
    const query = req.query.q;
    if (!query) return res.json([]);
    const users = await User.find({ 
      name: { $regex: query, $options: 'i' },
      _id: { $ne: req.user.userId || req.user.id } 
    })
    .select('name avatar role title isAvailable reputationScore')
    .limit(10);
    res.json(users);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server Error searching users' });
  }
});

// @route   GET /api/users/profile/:id
// @desc    Get a specific user's public profile
router.get('/profile/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server Error' });
  }
});

// @route   PUT /api/users/profile
// @desc    Update logged-in user's profile
router.put('/profile', auth, async (req, res) => {
  try {
    const { name, phone, location, skills, hourlyRate, isAvailable, title } = req.body;
    
    // Build profile object
    const profileFields = {};
    if (name) profileFields.name = name;
    if (phone) profileFields.phone = phone;
    if (location) profileFields.location = location;
    if (title) profileFields.title = title;
    if (skills) profileFields.skills = skills;
    if (hourlyRate !== undefined) profileFields.hourlyRate = hourlyRate;
    if (isAvailable !== undefined) profileFields.isAvailable = isAvailable;
    if (req.body.busySlots) profileFields.busySlots = req.body.busySlots;

    const user = await User.findByIdAndUpdate(
      req.user.userId,
      { $set: profileFields },
      { new: true }
    ).select('-password');

    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server Error updating profile' });
  }
});

// PUT /api/users/:id/reputation - Increment a user's helpfulness reputation
router.put('/:id/reputation', auth, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ msg: 'User not found' });
    
    user.reputationScore = (user.reputationScore || 0) + 1;
    await user.save();
    
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
