const { Schema, model } = require('mongoose')

const bookSchema = new Schema({
    bookId: Number,
    title: {
        type: String,
        trim: true
    },
    author_name: String,
    cover: Number
})

const Book = model('Book', bookSchema)

module.exports = Book