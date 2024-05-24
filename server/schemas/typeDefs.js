const typeDefs = `
    type Auth {
        token: String
        user: User
    }

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
        book(_id: ID!): Book
        users: [User]
        user(_id: ID!): User
    }

    type Mutation {
        login(email: String, password: String!): Auth

        addBook(
            userId: ID!
            title: String!
            author_name: [String]
            cover_i: Int
            first_publish_year: Int
        ): Book
        addUser(
            username: String!
            email: String!
            password: String!
        ):User
    }
`

module.exports = typeDefs