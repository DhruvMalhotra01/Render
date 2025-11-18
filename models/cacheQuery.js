// models/cacheQuery.js
const redis = require("../middleware/redisClient");

module.exports = async function cacheQuery(key, dbFunction, ttl = 120) {
    const cached = await redis.get(key);

    if (cached) {
        console.log("⚡ DB Cache Hit:", key);
        return cached;
    }

    const freshData = await dbFunction();
    await redis.set(key, freshData, ttl); // custom TTL

    return freshData;
};
