const express = require("express")
const app = express()
app.use(express.json())
const PORT = 3000;
const cors = require("cors");
const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));


const { intializeDatabase } = require("./db/db.connect")
const Hotel = require("./models/hotel.models");

intializeDatabase()

async function readAllHotels() {
    try {
        const hotels = await Hotel.find()
        console.log(hotels);
        return hotels
    } catch (error) {
        throw error
    }
}
readAllHotels()

app.get("/hotel", async (req, res) => {
    try {
        const hotels = await readAllHotels()
        if (hotels.length != 0) {
            res.json(hotels)
        } else {
            res.status(404).json({error: "No Hotel Found"})
        }
    } catch (error) {
        res.status(500).json({error: "Failed to fetch Hotels"})
    }
})

async function readHotelByName(hotelName) {
    try {
        const hotel = await Hotel.findOne({name: hotelName})
        return hotel
    } catch (error) {
        throw error
    }
}

app.get("/hotel/:hotelName", async (req, res) => {
    try {
        const hotel = await readHotelByName(req.params.hotelName)
        if (hotel) {
            res.json(hotel)
        } else {
            res.status(404).json({error: "Hotel not Found"})
        }
    } catch (error) {
        res.status(500).json({error: "Failed to fetch Hotel"})
    }
})

app.listen(PORT, () => {
    console.log(`server start on port ${PORT}`);
})
