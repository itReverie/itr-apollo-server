const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');

const PORT = 4000;

const app = express();

const messages=[
    {text:'Hello'},
    {text:'Hola'},
];

const typeDefs = gql`
  type Message {
    text: String
  }
  type Query {
    messages: [Message]
  }
`;

const resolvers = {
    Query: {
        messages: () => messages,
  },
};

const server = new ApolloServer({ typeDefs, resolvers });
server.applyMiddleware({ app });

app.listen({ port: PORT }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
)