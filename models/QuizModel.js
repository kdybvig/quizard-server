const mongoose = require("mongoose");

const quizSchema = new mongoose.Schema({
    name: {
        required: true,
        type: String
    },
    categories: {
        required: true,
        type: Array
    }
});

module.exports = mongoose.model("Quiz", quizSchema);