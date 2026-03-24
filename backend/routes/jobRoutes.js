const express = require('express');
const router = express.Router();
const JobRequest = require('../models/JobRequest');
const auth = require('../middleware/authMiddleware');

// @route   POST /api/jobs
// @desc    Any User creates a new job request / booking
router.post('/', auth, async (req, res) => {
  try {
    const { workerId, serviceType, description, duration } = req.body;

    const newJob = new JobRequest({
      customerId: req.user.userId, // This is just the person who requested it
      workerId,
      serviceType: serviceType || duration || 'General Service',
      description
    });

    const savedJob = await newJob.save();
    res.status(201).json(savedJob);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server Error creating job request' });
  }
});

// @route   GET /api/jobs
// @desc    Get all jobs for logged-in user (as customer or worker)
router.get('/', auth, async (req, res) => {
  try {
    const asCustomer = req.query.asCustomer === 'true';

    // Build adaptive query for sub-contracting support
    const query = (asCustomer || req.user.role === 'customer')
      ? { customerId: req.user.userId }
      : { workerId: req.user.userId };

    const jobs = await JobRequest.find(query)
      .populate('customerId', 'name avatar')
      .populate('workerId', 'name avatar')
      .sort({ createdAt: -1 });

    res.json(jobs);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server Error fetching jobs' });
  }
});

// @route   PUT /api/jobs/:id/status
// @desc    Update job status (Accept, Decline, Complete)
router.put('/:id/status', auth, async (req, res) => {
  try {
    const { status, financials } = req.body;
    const job = await JobRequest.findById(req.params.id);

    if (!job) return res.status(404).json({ message: 'Job not found' });

    // Validate ownership/role if needed, but for MVP keep it simple
    job.status = status;
    job.updatedAt = Date.now();
    
    // If completing the job, optionally log earnings
    if (financials) {
      job.financials = financials;
    }

    await job.save();
    
    const updated = await JobRequest.findById(req.params.id)
      .populate('customerId', 'name avatar')
      .populate('workerId', 'name avatar');

    res.json(updated);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server Error updating job status' });
  }
});

module.exports = router;
