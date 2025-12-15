const redis = require("redis");

const client = redis.createClient();

client.on("error", (err) => {
    console.log("Redis connection error:", err);
});

client.on("connect", () => {
    console.log("Redis connected!");
});

client.connect();

module.exports = client;
