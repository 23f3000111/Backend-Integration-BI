const express = require("express");
const app = express();
const cors = require("cors");
const { intializeDatabase } = require("./db/db.connect");
const Event = require("./models/event.models");
const Speaker = require("./models/speaker.models");

// Use trust-proxy if behind reverse proxy (like Vercel)
app.set("trust proxy", true);

// DB init
intializeDatabase();

// CORS config
const allowedOrigin = "https://backend-integration-bi-qdm6.vercel.app";  // update if needed

const corsOptions = {
  origin: function(origin, callback) {
    console.log("CORS: incoming request origin:", origin);
    if (!origin) {
      // some requests (e.g. Postman) may have no origin
      return callback(null, true);
    }
    if (origin === allowedOrigin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS: " + origin));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

// Apply CORS middleware
app.use(cors(corsOptions));

// Also handle OPTIONS preflight for all routes
app.options("*", cors(corsOptions));

app.use(express.json());

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
