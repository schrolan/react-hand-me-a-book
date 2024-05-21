const { Book, User } = require('../models')

const resolvers = {
    //Use return to return something to your query
    //These are for reading the data, mutations are for changing the data
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
    },
    Mutation: {
        addBook: async (parent, args, context, info) => {
            const book = await Book.create(args)
            if (args.userId) {
                await User.findByIdAndUpdate(args.userId, {
                    $addToSet: {
                        book: book._id
                    }
                })
            }
            return book
        },
        addUser: async (parent, args, context, info) => {
            return await User.create(args)
        }
    }
}

module.exports = resolvers