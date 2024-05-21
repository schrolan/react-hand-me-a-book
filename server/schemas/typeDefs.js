const typeDefs = `
    type Book {
        _id: ID
        title: String
        author_name: [String]
        cover_i: Int
        first_publish_year: Int
    }

    type User {
        _id: ID
        username: String
        email: String
        book: [Book]
    }

    type Query {
        books: [Book]
        book(title: String!): Book
        users: [User]
        user(_id: ID!): User
    }
`

module.exports = typeDefs