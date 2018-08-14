import express from 'express';
import { createServer } from 'http';
import { ApolloServer } from 'apollo-server-express';

import typeDefs  from './data/schema';
import resolvers from './data/resolvers';

const PORT = process.env.PORT ||  4000;

const app = express();

const apolloServer = new ApolloServer({ typeDefs, resolvers });
apolloServer.applyMiddleware({ app });

const httpServer = createServer(app);
apolloServer.installSubscriptionHandlers(httpServer);

httpServer.listen({ port: PORT }, () =>{
  console.log(`🚀 Server ready at http://localhost:${PORT}${apolloServer.graphqlPath}`)
  console.log(`🚀 Subscriptions ready at ws://localhost:${PORT}${apolloServer.subscriptionsPath}`)
})