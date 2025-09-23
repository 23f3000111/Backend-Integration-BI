const express = require("express");
const app = express();
const cors = require("cors");
const PORT = 3000;

// Middleware
app.use(express.json());
const allowedOrigins = ['https://backend-integration-bi-qdm6-dpwmcheze.vercel.app']; // Allow only this origin

app.use(cors({
  origin: function(origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: "GET, POST, PUT, DELETE, OPTIONS",
  allowedHeaders: "Content-Type, Authorization",
}));

// Handle OPTIONS requests for preflight
app.options('*', (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.sendStatus(204);
});

// Database and Models
const { intializeDatabase } = require("./db/db.connect");
const Event = require("./models/event.models");
const Speaker = require("./models/speaker.models");

intializeDatabase();

// Routes
app.get("/events", async (req, res) => {
  try {
    const event = await Event.find();
    if (!event || event.length === 0) {
      return res.status(404).json({ error: "No Event Found" });
    }
    res.json(event);
  } catch (error) {
    console.error("GET /events error:", error);
    res.status(500).json({ error: "Failed to fetch events." });
  }
});

app.get("/speakers", async (req, res) => {
  try {
    const speaker = await Speaker.find();
    if (!speaker || speaker.length === 0) {
      return res.status(404).json({ error: "No Speaker Found" });
    }
    res.json(speaker);
  } catch (error) {
    console.error("GET /speakers error:", error);
    res.status(500).json({ error: "Failed to fetch speaker." });
  }
});

module.exports = app;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
