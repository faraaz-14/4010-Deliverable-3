const mongoose = require('mongoose');

// MongoDB connection URL
const mongoURL = ''; // Waiting for Samir's connection URL

// Connect to MongoDB
mongoose.connect(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('MongoDB connection error:', error));