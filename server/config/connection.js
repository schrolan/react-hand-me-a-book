const mongoose = require('mongoose')

mongoose.connect(process.env.MONGODB_URI || "mongodb+srv://root:root@cluster0.5jsp7.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")

module.exports = mongoose.connection