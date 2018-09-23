const mongoose = require("mongoose");

const quizSchema = new mongoose.Schema({
    name: {
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
    },
    info: {
        required: false,
        type: String
    },
    isComplete: {
        required: true,
        type: Boolean
    },
    inProgress: {
        required: false,
        type: Boolean
    }
});

module.exports = mongoose.model("Quiz", quizSchema);