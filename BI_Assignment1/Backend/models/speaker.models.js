const mongoose = require("mongoose")

const speakerSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    speakerName: {
        type: String,
        required: true,
    },
    speakerPosition: {
        type: String,
        required: true,
    },
    speakerUrl: {
        type: String,
        default:"https://placehold.co/20x20?text=S"
    }
})

const Speaker = new mongoose.model("Speaker", speakerSchema)

module.exports = Speaker