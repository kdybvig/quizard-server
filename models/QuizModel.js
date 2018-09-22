const mongoose = require("mongoose");

const quizSchema = new mongoose.Schema({
    title: {
        required: true,
        type: String
    },
    categories: {
        required: true,
        type: Array
    },
    description: {
        required: true,
        type: String
    },
    owner: {
        required: true,
        type: String
    }
});

module.exports = mongoose.model("Quiz", quizSchema);