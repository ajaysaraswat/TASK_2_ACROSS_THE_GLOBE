const redisClient = require("./client");

// Set a value in Redis with an expiration time
const setCache = async (key, value, ttl = 3600) => {
	try {
		const jsonValue = JSON.stringify(value);
		await redisClient.set(key, jsonValue, "EX", ttl);
		console.log(`Cache set for key: ${key}`);
	} catch (err) {
		console.error("Error setting cache:", err);
	}
};

// Get a value from Redis
const getCache = async (key) => {
	try {
		const value = await redisClient.get(key);
		return value ? JSON.parse(value) : null;
	} catch (err) {
		console.error("Error getting cache:", err);
		return null;
	}
};

// Delete a specific key from Redis
const deleteCache = async (key) => {
	try {
		await redisClient.del(key);
		console.log(`Cache deleted for key: ${key}`);
	} catch (err) {
		console.error("Error deleting cache:", err);
	}
};

// Clear all Redis cache
const clearCache = async () => {
	try {
		await redisClient.flushall();
		console.log("All Redis cache cleared");
	} catch (err) {
		console.error("Error clearing cache:", err);
	}
};

module.exports = {
	setCache,
	getCache,
	deleteCache,
	clearCache,
};
