const express = require('express');
const router = express.Router();
const JobRequest = require('../models/JobRequest');
const auth = require('../middleware/authMiddleware');

// @route   POST /api/jobs
// @desc    Customer creates a new job request / booking
router.post('/', auth, async (req, res) => {
  try {
    if (req.user.role !== 'customer') {
      return res.status(403).json({ message: 'Only customers can book jobs' });
    }

    const { workerId, serviceType, description } = req.body;

    const newJob = new JobRequest({
      customerId: req.user.userId,
      workerId,
      serviceType,
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
    // If worker, find jobs where they are workerId. If customer, find where customerId.
    const query = req.user.role === 'worker' 
      ? { workerId: req.user.userId }
      : { customerId: req.user.userId };

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
