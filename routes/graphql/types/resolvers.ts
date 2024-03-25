import { gql } from 'graphql-tag';

const queries = gql`
  type Query {
    ships: [Ship!]
    missions: [Mission!]
    ship(id: ID!): Ship
  }
`;

const mutations = gql`
  type Mutation {
    placeholder: Boolean
  }
`;

export { queries, mutations };
