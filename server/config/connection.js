const mongoose = require('mongoose')

//The first part after the // is the local host ip, and the 27017 is the port that mongoose runs on be default
mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/handmeabook')

//This exports the object and the connection
module.exports = mongoose.connection