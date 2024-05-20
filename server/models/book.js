const { Schema, model } = require('mongoose')

const bookSchema = new Schema({
    title: {
        type: String,
        trim: true
    },
    author_name: [String],
    cover_i: Number,
    first_publish_year: Number
})

const Book = model('Book', bookSchema)

module.exports = Book