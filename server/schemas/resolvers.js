const { Book, User } = require('../models')

const resolvers = {
    //Use return to return something to your query
    Query: {
        books: async (parent, args, context, info) => {
            return await Book.find()
        },
        book: async (parent, args, context, info) => {
            return await Book.findById(args._id)
        },
        users: async (parent, args, context, info) => {
            return await User.find()
        },
        user: async (parent, args, context, info) => {
            return await User.findById(args._id)
        }
    }
}

module.exports = resolvers