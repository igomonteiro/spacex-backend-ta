import { QueryShipArgs } from '../../../common/types/backend';
import { shipController } from '../../../controllers';
import { ShipAttributes } from '../../../models/Ship';

const ships = async (): Promise<ShipAttributes[]> => {
  return shipController.get();
};

const ship = async (_, { id }: QueryShipArgs): Promise<ShipAttributes | null> => {
  return shipController.getById(id);
};

// const addShip = async (rootValue, _, context: GraphqlContext): Promise<ShipAttributes | null> => {
//   return null;
// };

const query = { ships, ship };

const mutation = {};

const Ship = { query, mutation };
export { Ship };
