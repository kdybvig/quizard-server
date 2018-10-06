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
    const username = req.params.username;
    Quiz.find({owner: username}, (err, quizzes) => {
        if (err) res.send(err);

        const underConstruction = quizzes.filter(quiz => {
            return !quiz.isComplete;
        });
        const readyToPlay = quizzes.filter(quiz => {
            return quiz.isComplete && !quiz.isInProgress;
        });
        const inProgress = quizzes.filter(quiz => {
            return quiz.isInProgress;
        });
        const userQuizzes = {underConstruction, readyToPlay, inProgress}

        res.status(200).json(userQuizzes);
    })
}

module.exports.showPublicQuizzesByUser = (req, res, next) => {
    const username = req.params.username;
    Quiz.find({owner: username, isComplete: true, "info.visibility":"Public", isInProgress: {$ne: true}}, (err, quizzes) => {
        if (err) res.send(err);
        res.status(200).json(quizzes);
    })
}