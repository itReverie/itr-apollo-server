const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
//const { typeDefs } = require('./data/schema');
//const { resolvers } = require('./data/resolvers');

const { Message } = require('./models/');

//console.log('TYPEDEFS:',typeDefs);
const PORT = 4000;

const app = express();

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
    }
`;


const resolvers = {
  Query: {
      // Fetch all messages
      async allMessages() {
          return await Message.all();
      },

      // Get a message by ID
      async fetchMessage(_, { id }) {
          return await Message.findById(id);
      },
  },
  Mutation: {
      // Create new message
      async createMessage(_, { text }) {
          return await Message.create({
              text
          });
      },
      // Update a particular message
      async updateMessage(_, { id, text}) {
          // fetch the user by it ID
          const message = await Message.findById(id);
          // Update the user
          await message.update({
              text
          });
          return message;
      },
  },

}

console.log('RESOLVERS:',resolvers);



// const messages=[
//     {text:'Hello'},
//     {text:'Hola'},
// ];

// const typeDefs = gql`
//   type Message {
//     text: String
//   }
//   type Query {
//     messages: [Message]
//   }
// `;

// const resolvers = {
//     Query: {
//         messages: () => messages,
//   },
// };

const server = new ApolloServer({ typeDefs, resolvers });
server.applyMiddleware({ app });

app.listen({ port: PORT }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
)