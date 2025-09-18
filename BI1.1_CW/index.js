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

async function createMovie(newMovie) {
    try {
        const movie = new Movie(newMovie)
        await movie.save()
        return movie
    }
    catch (error) {
        throw error
    }
}

async function readMovieByTitle(movieTitle) {
    try {
        const movie = await Movie.findOne({ title: movieTitle })
        return movie;
    } catch (error) {
        console.log("Error", error);
    }
}

app.get("/movies/:title", async (req, res) => {
    try {
        const movie = await readMovieByTitle(req.params.title)
        if (movie.length != 0) {
            res.json(movie)
        } else {
            res.status(404).json({ error: "Movie not Found" })
        }
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch Movie" })
    }
})

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

async function readMovieByDirector(movieDirector) {
    try {
        const movie = await Movie.find({ director: movieDirector })
        return movie
    } catch (error) {
        throw error
    }
}

app.get("/movies/director/:director", async (req, res) => {
    try {
        const movie = await readMovieByDirector(req.params.director)
        if (movie.length != 0) {
            res.json(movie)
        } else {
            res.status(404).json({ error: "Movie not Found" })
        }
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch Movie" })
    }
})

async function readMovieByGenre(movieGenre) {
    try {
        const movie = await Movie.find({ genre: movieGenre })
        return movie
    } catch (error) {
        throw error
    }
}

app.get("/movies/genre/:genre", async (req, res) => {
    try {
        const movie = await readMovieByGenre(req.params.genre)
        if (movie.length != 0) {
            res.json(movie)
        } else {
            res.status(404).json({ error: "Movie not Found" })
        }
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch Movie" })
    }
})

app.post("/movies", async (req, res) => {
    try {
        const movie = await createMovie(req.body)
        res.status(200).json({ message: "Movie added succesfully", movie })
    } catch (error) {
        throw error
    }
})

async function updateMovie(movieId, updatedData) {
    try {
        const movie = await Movie.findByIdAndUpdate(movieId, updatedData, { new: true })
        return movie;
    } catch (error) {
        throw error
    }
}


app.post("/movies/:id", async (req, res) => {
    try {
        const movie = await updateMovie(req.params.id, req.body)
        if (movie) {
            res.status(200).json({ message: "movie updated", movie: movie })
        }
    } catch (error) {
        res.status(404).json({ error: "Error uodating data" })
    }
})

async function deleteMovie(movieID) {
    try {
        const deleteMovie = await Movie.findByIdAndDelete(movieID)
        return deleteMovie;
    } catch (error) {
        throw error
    }
}

app.delete("/movies/:id", async (req, res) => {
    try {
        const deletedMovie = await deleteMovie(req.params.id)
        if (deletedMovie) {
            res.status(200).json({ message: "Movie Deleted Succesfully", deletedMovie })
        }
    } catch (error) {
        res.status(500).json({ error: "Failed to delete movie" })
    }
})


app.listen(PORT, () => {
    console.log(`server start on port ${PORT}`);
})
