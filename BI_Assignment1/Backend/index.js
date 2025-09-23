const express = require("express");
const app = express();
const cors = require("cors");
const { intializeDatabase } = require("./db/db.connect");
const Event = require("./models/event.models");
const Speaker = require("./models/speaker.models");

app.use(express.json());
const allowedOrigins = [
  "https://backend-integration-bi-qdm6-ic157d6wx.vercel.app/"
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps or curl)
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        return callback(new Error("CORS policy: This origin is not allowed"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);
intializeDatabase()

app.get("/events", async (req, res) => {
  try {
    const event = await Event.find();
    if (!event || event.length === 0) {
      return res.status(404).json({ error: "No Event Found" });
    }
    res.json(event);
  } catch (error) {
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
    res.status(500).json({ error: "Failed to fetch speaker." });
  }
});

// Required for Vercel to recognize the Express app as a handler
module.exports = app;
