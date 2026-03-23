const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const ForumPost = require('../models/ForumPost');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Ensure uploads directory exists
const uploadDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir)
  },
  filename: function (req, file, cb) {
    // Basic sanitize
    const cleanName = file.originalname.replace(/[^a-zA-Z0-9.\-]/g, '_');
    cb(null, Date.now() + '-' + cleanName)
  }
});

const upload = multer({ storage: storage });

// GET /api/forum
router.get('/', auth, async (req, res) => {
  try {
    const posts = await ForumPost.find()
      .populate('authorId', 'name title role avatar reputationScore')
      .populate('comments.authorId', 'name title role avatar reputationScore')
      .sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// POST /api/forum
router.post('/', auth, upload.single('media'), async (req, res) => {
  try {
    const { title, content } = req.body;
    if (!title || !content) return res.status(400).json({ msg: 'Need title & content' });

    let mediaUrl = null;
    let mediaType = null;

    if (req.file) {
      mediaUrl = '/uploads/' + req.file.filename;
      if (req.file.mimetype.startsWith('video/')) {
        mediaType = 'video';
      } else {
        mediaType = 'image';
      }
    }

    const newPost = new ForumPost({
      authorId: req.user.userId,
      title,
      content,
      mediaUrl,
      mediaType
    });

    await newPost.save();
    const populated = await ForumPost.findById(newPost._id).populate('authorId', 'name title role avatar reputationScore');
    res.status(201).json(populated);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// POST /api/forum/:id/comment
router.post('/:id/comment', auth, async (req, res) => {
  try {
    if (!req.body.content) return res.status(400).json({ msg: 'Need content' });

    const post = await ForumPost.findById(req.params.id);
    if (!post) return res.status(404).json({ msg: 'Post not found' });

    post.comments.push({
      authorId: req.user.userId,
      content: req.body.content
    });

    await post.save();
    const populated = await ForumPost.findById(post._id)
      .populate('authorId', 'name title role avatar reputationScore')
      .populate('comments.authorId', 'name title role avatar reputationScore');
      
    res.json(populated);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
