const express = require("express");
const app = express();
const cors = require("cors");
const { intializeDatabase } = require("./db/db.connect");
const Event = require("./models/event.models");
const Speaker = require("./models/speaker.models");


app.use(express.json());
const allowedOrigins = [
  "https://backend-integration-bi-qdm6-dbkp74yoq.vercel.app",
  "https://your-frontend-url.vercel.app"  // add all your frontend domains
];

const corsOptions = {
  origin: function(origin, callback) {
    // allow requests with no origin (like curl, or some mobile clients)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) !== -1) {
      return callback(null, true);
    } else {
      return callback(new Error("CORS Not Allowed Origin: " + origin), false);
    }
  },
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json());

// Preflight handling
app.options("*", cors(corsOptions));
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
