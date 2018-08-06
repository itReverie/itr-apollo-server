const { gql } = require('apollo-server-express');


// Define our schema using the GraphQL schema language
const typeDefs = gql`
    type Message {
        id: Int! # will be generated
        text: String!
        createdAt: DateTime! # will be generated
        updatedAt: DateTime! # will be generated
    }
    type Query {
        allMessages: [Message]
        fetchMessage(id: Int!): Message
    }
    type Mutation {
        createMessage (
            text: String!
        ): Message
        updateMessage (
            text: String!
        ): Message
        deleteMessage (id: Int!): Boolean
    }
`;

module.exports = typeDefs;