// middleware/cache.js
const redis = require("./redisClient");

// customCache(ttl) returns a middleware with a custom TTL
function customCache(ttl = 60) {
    return async (req, res, next) => {
        const key = req.originalUrl;

        try {
            const cachedData = await redis.get(key);
            if (cachedData) {
                console.log("⚡ Cache Hit:", key);
                return res.json(cachedData);
            }

            res.sendResponse = res.json;
            res.json = async (body) => {
                await redis.set(key, body, ttl); // custom TTL
                res.sendResponse(body);
            };

            next();
        } catch (err) {
            console.log("Cache middleware error:", err);
            next();
        }
    };
}

module.exports = customCache;
