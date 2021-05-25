const categoryResolvers = require('./category');

module.exports = {
  Query: {
    ...categoryResolvers.Query,
  },
  Mutation: {
    ...categoryResolvers.Mutation,
  },
};
