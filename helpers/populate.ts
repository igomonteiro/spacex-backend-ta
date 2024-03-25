if (process.env.NODE_ENV !== 'production') {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  require('dotenv').config();
}
import { db } from '../models';
import { cleanDb } from '../helpers/testHelpers';
import fetch from 'node-fetch';

const populate = async () => {
  await cleanDb();
  console.log('Populating database...');

  const ships = await fetch('https://spacex-production.up.railway.app/api/graphql', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query: '{ ships { id name image active model type year_built successful_landings weight_kg } }' }),
  })
    .then(res => res.json())
    .then(data => data.data.ships);

  const t = await db.sequelize.transaction();

  try {
    for (const ship of ships) {
      const createdShip = await db.Ship.create({
        active: ship.active,
        name: ship.name,
        model: ship.model,
        type: ship.type,
        successful_landings: ship.successful_landings,
        weight_kg: ship.weight_kg,
        year_built: ship.year_built,
        status: ship.status,
        image: ship.image,
      }, {
        transaction: t,
        returning: true
      });

      // Just to random the mission creation
      const shouldCreateMission = Math.random() < 0.5;
      if (shouldCreateMission) {
        await db.Mission.create({
          name: ship.name + " mission 1",
          shipId: createdShip.id
        }, {
          transaction: t
        });      
      }

      if (shouldCreateMission) {
        await db.Mission.create({
          name: ship.name + " mission 2",
          shipId: createdShip.id
        }, {
          transaction: t
        });
      }
      }
    await t.commit();
  } catch (err) {
    await t.rollback();
    throw Error("Error populating the database",);
  }

    

  await db.sequelize.close();
};

if (require.main === module) {
  populate();
}

export { populate };
