import { createClient } from "redis";
import { promisify } from "util";

const client = createClient({
  host: "redis",
  port: 6379,
  client: 1,
});

client.on("connect", function () {
  console.info("REDIS: Connected");
});

client.on("error", function (err) {
  console.error("[REDIS_ERROR]:", err);
});

const redisGet = promisify(client.get).bind(client);
const redisSet = promisify(client.set).bind(client);
const redisExpire = promisify(client.expire).bind(client);

const get = (key) => {
  if (!client.connected) return null;
  try {
    return redisGet(key);
  } catch (e) {
    console.error(`Cannot get ${key} from redis`);
  }
};

const set = (key, value, ttl = 3600) => {
  if (!client.connected) return;
  try {
    redisSet(key, value).then(() => redisExpire(key, ttl));
  } catch (e) {
    console.error(`Cannot set ${key} with ${value} in redis`);
  }
};

export default {
  set,
  get,
};
