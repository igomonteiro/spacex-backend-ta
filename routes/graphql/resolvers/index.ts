import { Ship } from './ship';

const resolvers = {
  Query: {
    ...Ship.query,
  },
  Mutation: {
    ...Ship.mutation,
  },
};

export { resolvers };
