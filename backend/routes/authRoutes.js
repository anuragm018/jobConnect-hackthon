const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// @route   POST /api/auth/register
// @desc    Register a new user (customer or worker)
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, role, phone, location, skills, hourlyRate } = req.body;
    
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: 'User already exists' });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user = new User({
      name, email, password: hashedPassword, role, phone, location, 
      skills: skills || [], 
      hourlyRate: hourlyRate || null
    });

    await user.save();

    const payload = { userId: user._id, role: user.role };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '7d' });

    res.status(201).json({ 
      token, 
      user: { id: user._id, name: user.name, email: user.email, role: user.role, avatar: user.avatar } 
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error during registration' });
  }
});

// @route   POST /api/auth/login
// @desc    Authenticate user & get token
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const payload = { userId: user._id, role: user.role };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '7d' });

    res.json({ 
      token, 
      user: { id: user._id, name: user.name, email: user.email, role: user.role, avatar: user.avatar } 
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error during login' });
  }
});

module.exports = router;
