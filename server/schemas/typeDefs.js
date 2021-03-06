const { gql } = require('apollo-server-express');

const typeDefs = gql `
type User {
    _id: ID
    username: String!
    email: String!
    password: String!
    savedBooks: [Book]!
    bookCount: Int
}

type Book {
    bookId: String!
    authors: [String]
    description: String!
    image: String
    link: String
    title: String!
}

type Auth {
    token: String!
    user: [User]
}
type Query {
    me:User
}

input saveBookContent {
    authors: [String]
    title: String!
    image: String
    link: String
    bookId: String!
    description: String!

}

type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    saveBook(bookData: saveBookContent!): User
    removeBook(bookId: String!): User

}

`;

module.exports = typeDefs;