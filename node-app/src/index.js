const express = require("express");
const { createClient } = require("redis");

const app = express();

// ENV VARIABLES
const PORT = process.env.PORT || 3000;
const REDIS_HOST = process.env.REDIS_HOST || "localhost";
const REDIS_PORT = 6379;

// REDIS CLIENT
const redisClient = createClient({
  url: `redis://${REDIS_HOST}:${REDIS_PORT}`
});

redisClient.on("error", (err) => {
  console.error("Redis error:", err);
});

(async () => {
  await redisClient.connect();
  console.log("Connected to Redis");
})();

// ROOT ENDPOINT
app.get("/", async (req, res) => {
  try {
    let count = await redisClient.get("counter");

    if (!count) {
      count = 0;
    }

    count = parseInt(count) + 1;

    await redisClient.set("counter", count);

    res.json({
      message: "Hello from Hitasoft DevOps Task 🚀",
      visits: count
    });

  } catch (err) {
    res.status(500).json({
      error: "Redis connection failed",
      details: err.message
    });
  }
});

// HEALTH CHECK (IMPORTANT FOR K8s)
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "OK"
  });
});

// START SERVER
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});