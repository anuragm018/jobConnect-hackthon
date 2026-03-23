const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  workerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  subtitle: { type: String, required: true },
  category: { type: String, required: true },
  imageUrl: { type: String, required: true },
  overview: { type: String, required: true },
  metrics: {
    duration: { type: String },
    scale: { type: String },
    area: { type: String },
    budget: { type: String }
  },
  materials: [{ type: String }],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Project', ProjectSchema);
