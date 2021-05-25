const { ApolloServer, PubSub, gql } = require('apollo-server');
const mongoose = require('mongoose');

const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');
const { MONGODB } = require('./config');

const pubsub = new PubSub();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req, pubsub }),
});

try {
  mongoose.connect(MONGODB, { useNewUrlParser: true }).then(() => {
    server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
      console.log(`🚀  Server ready at ${url}`);
    });
  });
} catch (error) {
  handleError(error);
}
