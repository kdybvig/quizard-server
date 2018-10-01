const express = require('express');
const {showQuizzes, showQuizzesByUser, addQuiz, updateQuiz} = require('../controllers/quizzesController');
const quizzesRouter = express.Router();

const bodyParser = require('body-parser');
quizzesRouter.use(bodyParser.json());

quizzesRouter.get('/', showQuizzes);
quizzesRouter.get('/user/:username', showQuizzesByUser)
quizzesRouter.post('/', addQuiz);
quizzesRouter.put('/:quizid', updateQuiz);

module.exports = quizzesRouter;