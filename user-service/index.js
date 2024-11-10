const express = require('express');
const mysql = require('mysql2');
const axios = require('axios');
require('dotenv').config();

const app = express();
app.use(express.json());

const db = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
});

db.connect((err) => {
  if (err) throw err;
  console.log('MySQL connected.');
});

// Endpoint to get user info
app.get('/user/:id', (req, res) => {
  const { id } = req.params;
  db.query('SELECT * FROM users WHERE id = ?', [id], (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results[0]);
  });
});

// Endpoint to get user info with all bookings
app.get('/user/:id/bookings', async (req, res) => {
  const { id } = req.params;

  try {
    // Fetch user information
    const [user] = await new Promise((resolve, reject) => {
      db.query('SELECT * FROM users WHERE id = ?', [id], (err, results) => {
        if (err) return reject(err);
        resolve(results);
      });
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Fetch user bookings from booking-service
    const bookingResponse = await axios.get(`http://booking-service:4000/booking/${id}`);
    const bookings = bookingResponse.data;

    // Combine user info and bookings
    const userWithBookings = {
      id: user.id,
      name: user.name,
      email: user.email,
      bookings: bookings,
    };

    res.json(userWithBookings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch user bookings' });
  }
});

app.listen(3000, () => {
  console.log('User service running on port 3000');
});
