const mongoose = require('mongoose');

const CollabSchema = new mongoose.Schema({
  authorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, enum: ['URGENT', 'UPCOMING', 'HELP NEEDED'], required: true },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('CollabRequest', CollabSchema);
