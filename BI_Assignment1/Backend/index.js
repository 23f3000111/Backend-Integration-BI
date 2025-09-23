const express = require("express");
const app = express();
const cors = require("cors");
const { intializeDatabase } = require("./db/db.connect");
const Event = require("./models/event.models");
const Speaker = require("./models/speaker.models");


// Make CORS the first thing
const allowedOrigins = [
  "https://backend-integration-bi-qdm6-5x0r61ybn.vercel.app",
  "https://backend-integration-bi-8xca-94uoblq2w.vercel.app",
  // add all your frontend origins
];

const corsOptions = {
  origin: function(origin, callback) {
    // allow no-origin requests (e.g. from Postman) too
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS: " + origin), false);
    }
  },
  methods: ["GET","POST","PUT","PATCH","DELETE","OPTIONS"],
  allowedHeaders: ["Content-Type","Authorization"],
  credentials: true,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());

// Explicitly handle preflight
app.options("*", cors(corsOptions));  // for all routes

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
