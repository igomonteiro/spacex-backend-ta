import { db } from '../models';
import { ShipAttributes } from '../models/Ship';

const get = async (): Promise<ShipAttributes[]> => {
  const ships = await db.Ship.findAll();
  return ships;
};

const getById = async (id: string): Promise<ShipAttributes | null> => {
  const ship = await db.Ship.findOne({
    where: {
      id
    },
    include: [{
      model: db.Mission,
      as: 'missions'
    }]
  });
  if (!ship) {
    throw new Error('Controller:Ship::Could not find ship.');
  }
  return ship;
}

const shipController = {
  get,
  getById
};
export { shipController };
