const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  role: { type: String, enum: ['customer', 'worker'], required: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String },
  location: { type: String },
  avatar: { type: String, default: 'https://images.unsplash.com/photo-1540569014015-19a7be504e3a?auto=format&fit=crop&w=100&h=100' },

  // Worker-Specific Fields
  title: { type: String }, // e.g., 'Senior Plumber'
  skills: [{ type: String }],
  hourlyRate: { type: Number },
  isAvailable: { type: Boolean, default: true },
  successRate: { type: Number, default: 100 },
  reviewsCount: { type: Number, default: 0 },
  verified: { type: Boolean, default: true },
  reputationScore: { type: Number, default: 0 },
  busySlots: [{
    date: { type: String },
    time: { type: String }
  }],

  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', UserSchema);
