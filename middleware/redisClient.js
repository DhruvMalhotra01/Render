// middleware/redisClient.js
const redis = require("redis");

let client;

(async () => {
    client = redis.createClient();

    client.on("error", (err) => console.log("❌ Redis Error:", err));
    client.on("connect", () => console.log("✅ Redis Connected"));

    await client.connect();
})();

module.exports = {
    get: async (key) => {
        const data = await client.get(key);
        return data ? JSON.parse(data) : null;
    },
    set: async (key, value, ttl = 60) => {
        await client.setEx(key, ttl, JSON.stringify(value));
    }
};