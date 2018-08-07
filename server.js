const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const  typeDefs  = require('./data/schema');
const  resolvers = require('./data/resolvers');

const PORT = 4000;

const app = express();

const server = new ApolloServer({ typeDefs, resolvers });
server.applyMiddleware({ app });

app.listen({ port: PORT }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
)