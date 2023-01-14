import config from 'config';
import mongoose from 'mongoose';
import { afterAll, beforeAll, beforeEach } from 'vitest';

const setupTestDB = () => {
  beforeAll(async () => {
    mongoose.set('strictQuery', false);
    await mongoose.connect(config.get('db'));
  });

  beforeEach(async () => {
    await Promise.all(
      Object.values(mongoose.connection.collections).map(async (collection) =>
        collection.deleteMany({})
      )
    );
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });
};

export default setupTestDB;
