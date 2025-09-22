const express = require("express")
const app = express()
app.use(express.json())

const PORT = 3000;
const {intializeDatabase} = require("./db/db.connect")
const Event = require("./models/event.models")
const Speaker = require("./models/speaker.models")

const cors = require("cors");
const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));


intializeDatabase()

const sampleEvents = [
  {
    title: "Tech Conference",
    startDate: new Date("2023-07-13T07:00:00"),
    endDate: new Date("2023-07-13T10:00:00"),
    type: "Offline",
    host: "Tech Experts",
    venue: "Tech Hub, Bangalore",
    description: "Explore the latest trends in technology with industry leaders.",
    fees: 2000,
    tag: ["technology", "networking"],
    dressCode: "Business Formal",
    ageRestriction: "18+",
    thumbnailUrl: "https://placehold.co/400x400?text=Tech+Conference"
  },
  {
    title: "Design Workshop",
    startDate: new Date("2023-07-10T14:00:00"),
    endDate: new Date("2023-07-10T17:00:00"),
    type: "Offline",
    host: "Creative Minds",
    venue: "Design Studio, Mumbai",
    description: "Hands-on workshop covering the fundamentals of modern design.",
    fees: 1500,
    tag: ["design", "workshop"],
    dressCode: "Casual",
    ageRestriction: "16+",
    thumbnailUrl: "https://placehold.co/400x400?text=Design+Workshop"
  },
  {
    title: "Marketing Seminar",
    startDate: new Date("2023-08-15T10:00:00"),
    endDate: new Date("2023-08-15T12:00:00"),
    type: "Offline",
    host: "Marketing Experts",
    venue: "Marketing City, 789 Marketing Avenue",
    description: "Learn the latest strategies in digital marketing from top industry professionals.",
    fees: 3000,
    tag: ["marketing", "digital"],
    dressCode: "Smart Casual",
    ageRestriction: "18+",
    thumbnailUrl: "https://placehold.co/400x400?text=Marketing+Seminar"
  },
  {
    title: "Entrepreneurship Webinar",
    startDate: new Date("2023-09-05T18:00:00"),
    endDate: new Date("2023-09-05T20:00:00"),
    type: "Online",
    host: "Startup Community",
    venue: "Zoom Online",
    description: "An online webinar guiding entrepreneurs through funding, scaling, and growth.",
    fees: 1000,
    tag: ["entrepreneurship", "startup"],
    dressCode: "None",
    ageRestriction: "16+",
    thumbnailUrl: "https://placehold.co/400x400?text=Entrepreneurship+Webinar"
  },
  {
    title: "Data Science Bootcamp",
    startDate: new Date("2023-09-20T09:00:00"),
    endDate: new Date("2023-09-20T17:00:00"),
    type: "Offline",
    host: "Data Experts",
    venue: "Tech Park, Hyderabad",
    description: "A full-day bootcamp diving deep into machine learning and AI.",
    fees: 5000,
    tag: ["data", "AI", "machine learning"],
    dressCode: "Business Casual",
    ageRestriction: "18+",
    thumbnailUrl: "https://placehold.co/400x400?text=Data+Science+Bootcamp"
  },
  {
    title: "Photography Masterclass",
    startDate: new Date("2023-10-10T15:00:00"),
    endDate: new Date("2023-10-10T18:00:00"),
    type: "Online",
    host: "Photo Gurus",
    venue: "Google Meet Online",
    description: "Improve your photography skills with professional photographers.",
    fees: 1200,
    tag: ["photography", "art"],
    dressCode: "None",
    ageRestriction: "All Ages",
    thumbnailUrl: "https://placehold.co/400x400?text=Photography+Masterclass"
  }
];

const sampleSpeakers = [

  { title: "Tech Conference", speakerName: "Alice Williams", speakerPosition: "CTO at TechCorp" },
  { title: "Tech Conference", speakerName: "David Lee", speakerPosition: "AI Researcher at OpenAI" },
  { title: "Design Workshop", speakerName: "Sophia Chen", speakerPosition: "UI/UX Specialist at Creative Labs" },
  { title: "Marketing Seminar", speakerName: "Sarah Johnson", speakerPosition: "Marketing Manager" },
  { title: "Marketing Seminar", speakerName: "Michael Brown", speakerPosition: "SEO Specialist" },
  { title: "Entrepreneurship Webinar", speakerName: "Rajiv Patel", speakerPosition: "Founder of StartupX" },
  { title: "Data Science Bootcamp", speakerName: "Emma Davis", speakerPosition: "Senior Data Scientist at DataWorks" },
  { title: "Photography Masterclass", speakerName: "Liam Smith", speakerPosition: "Freelance Photographer" }
];


app.get("/events", async (req, res) => {
    try{
        const event = await Event.find()
        if (event.length > 0) {
            res.json(event)
        }
        else {
            res.status(404).json({ error: "No Event Found" })
        }
    }
    catch (error) {
        res.status(500).json({ error: "Failed to fetch event." })
    }
}) 

app.get("/speakers", async (req, res) => {
    try{
        const speaker = await Speaker.find()
        if (speaker) {
            res.json(speaker)
        }
        else {
            res.status(404).json({ error: "No Speaker Found" })
        }
    }
    catch (error) {
        res.status(500).json({ error: "Failed to fetch speaker." })
    }
})

app.listen(PORT, () => {
    console.log(`server start on port ${PORT}`);
})
