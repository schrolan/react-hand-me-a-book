const mongoose = require('mongoose');

// Retrieve MongoDB URI from environment variables
const mongoose = require('mongoose');
const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/mydatabase';

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Export the connection
module.exports = mongoose.connection;