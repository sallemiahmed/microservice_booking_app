const express = require('express');
const { createClient } = require('redis');
require('dotenv').config();

const app = express();
const redisClient = createClient({
  url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,
});

redisClient.connect().then(() => console.log('Redis connected.')).catch(console.error);

app.use(express.json());

app.get('/booking/:userId', async (req, res) => {
  const { userId } = req.params;
  const bookings = await redisClient.hGetAll(`bookings:${userId}`);
  res.json(bookings);
});

app.listen(4000, () => {
  console.log('Booking service running on port 4000');
});