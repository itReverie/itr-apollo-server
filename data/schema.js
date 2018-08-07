const { gql } = require('apollo-server-express');


// Define our schema using the GraphQL schema language
const typeDefs = gql`
    type Message {
        text: String!
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
    },
    type Subscription {
        messageAdded: Message
    }
`;

module.exports = typeDefs;