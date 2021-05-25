const { gql } = require('apollo-server');

module.exports = gql`
  type Category {
    id: ID!
    name: String!
    createdAt: String!
    amount: String!
    price: String!
    purchases: [Purchase]!
  }
  type Purchase {
    id: ID!
    date: String
    name: String!
    price: String!
  }
  input addCategoryInput {
    name: String!
    amount: String!
    price: String!
  }

  type Query {
    getCategoryList: [Category]
    getCategory(categoryId: ID!): Category!
    getAllPurchases: [Purchase]
  }
  type Mutation {
    addCategory(addCategoryInput: addCategoryInput): Category
    addItem(categoryId: ID!, amount: String!): Category
    createPurchase(categoryId: String!, name: String!, price: String!): Category
    getClear(categoryId: ID!): [Category]
  }
`;
