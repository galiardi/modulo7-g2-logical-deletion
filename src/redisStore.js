import redis from 'redis';
import RedisStore from 'connect-redis';

// $ redis-server

const redisClient = redis.createClient();
redisClient.connect().catch(console.error);

const redisStore = new RedisStore({
  client: redisClient,
  prefix: 'grupal3:',
});

export { redisStore };
