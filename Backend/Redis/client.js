const { Redis } = require("ioredis");

const client = Redis();

module.exports = client;
