const Quiz = require('../models/QuizModel');


module.exports.addQuiz = (req, res, next) => {
    const newQuiz = Quiz(req.body);
    newQuiz.save();
    res.status(201).send(newQuiz);
};

module.exports.showQuizzes = (req, res, next) => {
    Quiz.find({}, (err, quizzes) => {
        if (err) res.send(err);
        res.status(200).send(quizzes);
    })
}