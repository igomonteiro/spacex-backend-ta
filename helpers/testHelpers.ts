import * as supertest from 'supertest';
import { db } from '../models';
import { umzug } from '../migrate';

const cleanDb = async () => {
  await db.sequelize.query('SET FOREIGN_KEY_CHECKS = 0', { raw: true });
  await umzug.down({ to: 0 })
  await umzug.up(); // migrating
  await db.sequelize.query('SET FOREIGN_KEY_CHECKS = 1', { raw: true });
};

const checkApolloResponse = (response: supertest.Response) => {
  try {
    expect(response.error).toBe(false);
    expect(response.body.errors).toBeUndefined();
  } catch (error) {
    console.error(JSON.stringify(response.body.errors, null, 2));
    console.error(JSON.stringify(response.error, null, 2));
    throw error;
  }
};

export { cleanDb, checkApolloResponse };
