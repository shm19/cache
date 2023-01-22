import config from 'config';
import { createClient } from 'redis';
import mongoose, { Query } from 'mongoose';

const redisHost = config.get('redis.host');
const redisPort = config.get('redis.port');

export const client = createClient({
  url: `redis://${redisHost}:${redisPort}`,
});

client.connect();

const originalExec = mongoose.Query.prototype.exec;

mongoose.Query.prototype.cache = function () {
  this.useCache = true;
  return this;
};

mongoose.Query.prototype.exec = async function () {
  if (!this.useCache) {
    return originalExec.apply(this);
  }

  const key = JSON.stringify({
    ...this.getQuery(),
    collection: this.model.modelName,
  });

  const cacheValue = await client.get(key);
  if (cacheValue) {
    const doc = JSON.parse(cacheValue);
    return Array.isArray(doc)
      ? doc.map((d) => new this.model(d))
      : new this.model(doc);
  }

  const result = await originalExec.apply(this);
  client.set(key, JSON.stringify(result), {
    EX: 1000 * 60,
  });
  return result;
};
