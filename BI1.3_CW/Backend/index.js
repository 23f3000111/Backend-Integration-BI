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
const Movie = require("./models/movies.models");

intializeDatabase()

async function readAllMovies(req, res) {
    try {
        const movie = await Movie.find()
        return movie
    } catch (error) {
        res.status(404).json({ error: "Movie not Found" })
    }
}

app.get("/movies", async (req, res) => {
    try {
        const movie = await readAllMovies()
        if (movie.length != 0) {
            res.json(movie)
        }
        else {
            res.status(404).json({ error: "No MOvie Found" })
        }
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch movies." })
    }
})

app.delete("/movies/:id", async (req, res) => {
    try {
        const deletedMovie = await Movie.findByIdAndDelete(req.params.id)
        if (deletedMovie) {
            res.json({ message: "Movie deleted successfully" })
        } else {
            res.status(404).json({ error: "Movie not found" })
        }
    } catch (error) {
        res.status(500).json({ error: "Failed to delete Movie" })
    }
})

app.listen(PORT, () => {
    console.log(`server start on port ${PORT}`);
})
