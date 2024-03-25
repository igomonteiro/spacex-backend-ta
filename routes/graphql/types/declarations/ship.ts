import { gql } from 'graphql-tag';

export const Ship = gql`
  type Ship {
    id: ID!
    name: String
    model: String
    type: String
    image: String
    weight_kg: Int
    successful_landings: Int
    year_built: Int
    status: String
    missions: [Mission]
    active: Boolean!
  }
`;
