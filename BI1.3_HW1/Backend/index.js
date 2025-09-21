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
const Book = require("./models/books.model");

intializeDatabase()

app.get("/books", async (req, res) => {
    try {
        const books = await Book.find()
        if (books.length != 0) {
            res.json(books)
        } else {
            res.status(404).json({ error: "No Book Found" })
        }
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch Books" })
    }
})

app.delete("/books/:id", async (req, res) => {
    try {
        const deletedBook = await Book.findByIdAndDelete(req.params.id)
        if (deletedBook) {
            res.json({ message: "Book deleted successfully" })
        } else {
            res.status(404).json({ error: "Book not found" })
        }
    } catch (error) {
        res.status(500).json({ error: "Failed to delete Book" })
    }
})

app.listen(PORT, () => {
    console.log(`server start on port ${PORT}`);
})
