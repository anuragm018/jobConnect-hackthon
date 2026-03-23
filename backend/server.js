const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

if (!process.env.MONGO_URI) {
  console.error("FATAL ERROR: MONGO_URI is not defined in .env file.");
  process.exit(1);
}

// Database Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected successfully'))
  .catch((err) => console.log('MongoDB connection error: ', err));

// Basic Route
app.get('/api', (req, res) => {
  res.json({ message: 'JobConnect API Pipeline Running' });
});

// Import Routes
app.use('/api/auth', require('./routes/authRoutes'));
// app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/projects', require('./routes/projectRoutes'));
// app.use('/api/jobs', require('./routes/jobRoutes'));
// app.use('/api/jobs', require('./routes/jobRoutes'));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
