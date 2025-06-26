// api/weather.js
const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');
require('dotenv').config(); // Load .env

const app = express();
const PORT = process.env.PORT || 3000;
const API_KEY = process.env.API_KEY; // 🔐 Secure key

app.use(cors());

app.get('/api/weather', async (req, res) => {
  const city = req.query.city || 'Delhi';
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch weather data', details: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Weather proxy running on http://localhost:${PORT}`);
});
