const mongoose = require('mongoose');

// MongoDB connection URL
const mongoURL = 'mongodb+srv://4010group:quickwhip123@quickwhip.kpxfz.mongodb.net/'; 

// Connect to MongoDB
mongoose.connect(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('MongoDB connection error:', error));
