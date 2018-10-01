const Quiz = require('../models/QuizModel');


module.exports.addQuiz = (req, res, next) => {
    const newQuiz = Quiz(req.body);
    newQuiz.save();
    res.status(201).send(newQuiz);
};

module.exports.updateQuiz = (req, res, next) => {
    Quiz.findByIdAndUpdate(req.params.quizid, req.body, {new:true}, (err, quiz) => {
            if (err) return res.status(500).send(err);
            return res.send(quiz);
        })
};

module.exports.showQuizzes = (req, res, next) => {
    Quiz.find({isComplete: true, "info.visibility":"Public", isInProgress: {$ne: true}}, (err, quizzes) => {
        if (err) res.send(err);
        res.status(200).send(quizzes);
    })
}

module.exports.showQuizzesByUser = (req, res, next) => {
    const username = req.params;
    Quiz.find({owner: username}, (err, quizzes) => {
        if (err) res.send(err);
        res.status(200).send(quizzes);
    })
}