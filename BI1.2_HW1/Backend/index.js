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

async function createBook(newBook) {
    try {
        const book = new Book(newBook)
        await book.save()
        return book
    }
    catch (error) {
        throw error
    }
}

app.post("/books", async (req, res) => {
    try {
        const book = await createBook(req.body)
        res.status(200).json({ message: "Book added succesfully", book })
    } catch (error) {
        throw error
    }
})

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

app.listen(PORT, () => {
    console.log(`server start on port ${PORT}`);
})
