const cache = {};

const client = {
  on: jest.fn(),
  get: jest.fn((key, cb) => {
    cb(null, cache[key]);
  }),
  set: jest.fn((key, value, cb) => {
    cache[key] = value;
    cb(null, "1");
  }),
  expire: jest.fn((key, ttl, cb) => cb(null, "1")),
  connected: true,
};

const createClient = () => client;

export { createClient, client, cache };
