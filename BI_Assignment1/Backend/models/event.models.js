const mongoose = require("mongoose")

const eventSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    startDate:{
        type: Date,
        required: true,
    },
    endDate:{
        type: Date,
        required: true,
    },
    type: {
        type: String,
        enum: ["Offline", "Online"]
    },
    thumbnailUrl: {
        type: String,
        default:"https://placehold.co/400x400?text=Thumbnail"
    },
    tag: [{
        type: String,
    }],
    host: {
        type: String,
        required: true
    }, 
    venue: {
        type: String,
        required: true
    }, 
    description: {
        type: String,
        required: true
    }, 
    fees: {
        type: Number,
        required: true
    },
    dressCode: {
        type: String,
        default: "none"
    },
    ageRestriction: {
        type: String,
        default: "none"
    }
},
{
    timestamps: true,
})

const Event = new mongoose.model("Event", eventSchema)

module.exports = Event