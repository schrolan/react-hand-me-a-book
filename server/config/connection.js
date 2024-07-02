const mongoose = require('mongoose');

// Retrieve MongoDB URI from environment variables
const mongoURI = process.env.MONGODB_URI || 'mongodb+srv://Lance:yourpassword@cluster0.ayqru4p.mongodb.net/yourdbname?retryWrites=true&w=majority&appName=Cluster0/handmeabook';
mongoose.connect(mongoURI, {
  tls: true,
  tlsInsecure: true // Set to false in production
}).then(() => {
  console.log('Successfully connected to MongoDB');
}).catch((err) => {
  console.error('Error connecting to MongoDB:', err);
});

// Connect to MongoDB
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  tls: true,
  tlsInsecure: true // Set to true for testing, false for production
}).then(() => {
  console.log('Successfully connected to MongoDB');
}).catch((err) => {
  console.error('Error connecting to MongoDB:', err);
});

// Export the connection
module.exports = mongoose.connection;