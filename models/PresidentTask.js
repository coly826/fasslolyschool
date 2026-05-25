const mongoose = require("mongoose");

const presidentTaskSchema = new mongoose.Schema({
    titre: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("PresidentTask", presidentTaskSchema);