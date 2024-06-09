const { GraphQLError } = require('graphql')
const { Book, User } = require('../models')
const { signToken } = require('../utils/auth')

const resolvers = {
    //Use return to return something to your query
    //These are for reading the data, mutations are for changing the data
    Query: {
        books: async (parent, args, context, info) => {
            return await Book.find()
        },
        book: async (parent, args, context, info) => {
            return await Book.findOne({ title: args.title })
        },
        users: async (parent, args, context, info) => {
            return await User.find()
        },
        user: async (parent, args, context, info) => {
            return await User.findById(args._id).populate('book')
        }
    },
    Mutation: {
        login: async (parent, { email, password }, context, info) => {
            //find the user based on email
            const user = await User.findOne({ email })
            if (!user) {
                throw new GraphQLError('User not found', {
                    extensions: {
                        code: 'USER NOT FOUND',
                        http: { status: 404 }
                    }
                })
            }
            //verify the password
            const isCorrectPassword = await user.isCorrectPassword(password)
            if (!isCorrectPassword) {
                throw new GraphQLError('Password incorrect', {
                    extensions: {
                        code: 'INCORRECT PASSWORD',
                        http: { status: 401 }
                    }
                })
            }
            //sign the token
            const token = signToken(user)
            //return object that resembles Auth
            return {
                token,
                user
            }
        },
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
            const user = await User.create(args)
            const token = signToken(user);
            return { token, user };
        }
    }
}

module.exports = resolvers