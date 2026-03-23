const express = require('express');
const router = express.Router();
const Project = require('../models/Project');
const auth = require('../middleware/authMiddleware');

// @route   GET /api/projects
// @desc    Get all projects for the Explore feed
router.get('/', async (req, res) => {
  try {
    // Populate the workerId field to automatically append the creator's profile data
    const projects = await Project.find()
      .populate('workerId', 'name avatar successRate reviewsCount')
      .sort({ createdAt: -1 });
      
    res.json(projects);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server Error fetching projects' });
  }
});

// @route   POST /api/projects
// @desc    Upload a new project showcase
// @access  Worker Only (Private)
router.post('/', auth, async (req, res) => {
  try {
    if (req.user.role !== 'worker') {
      return res.status(403).json({ message: 'Access denied. Only workers can upload projects' });
    }

    const { title, subtitle, category, imageUrl, overview, metrics, materials } = req.body;
    
    const newProject = new Project({
      workerId: req.user.userId,
      title, 
      subtitle: subtitle || 'Just Uploaded • Recent Work', 
      category, 
      imageUrl, 
      overview, 
      metrics: metrics || { duration: '-', scale: '-', area: '-', budget: '-' }, 
      materials: materials || []
    });

    const savedProject = await newProject.save();
    
    // Return populated project so the frontend can reliably render instantly without a second fetch
    const populatedProject = await Project.findById(savedProject._id).populate('workerId', 'name avatar successRate reviewsCount');
    
    res.status(201).json(populatedProject);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server Error on Project Upload' });
  }
});

module.exports = router;
