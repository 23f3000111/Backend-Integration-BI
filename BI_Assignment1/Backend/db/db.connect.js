const mongoose = require("mongoose")
require("dotenv").config()

const mongoUrl = process.env.MONGODB

const intializeDatabase = async () => {
    await mongoose
                .connect(mongoUrl)
                .then(() => {
                    console.log("Connected to database");
                })
                .catch((error) => {
                    throw "Failed to connect."
                })
}

module.exports = { intializeDatabase }