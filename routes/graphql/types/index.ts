import { mutations, queries } from './resolvers';
import { Ship } from './declarations/ship';
import { Mission } from './declarations/mission';
import { Pagination } from './declarations/pagination';
import { date } from './declarations/date';

export const typeDefs = [mutations, queries, date, Pagination, Ship, Mission];