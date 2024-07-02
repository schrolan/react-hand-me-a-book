const mongoose = require('mongoose')

//The first part after the // is the local host ip, and the 27017 is the port that mongoose runs on be default
mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://Lance:<password>@cluster0.ayqru4p.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0/handmeabook')

//This exports the object and the connection
module.exports = mongoose.connection