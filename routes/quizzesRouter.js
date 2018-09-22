const express = require('express');
const {showQuizzes, addQuiz, updateQuiz} = require('../controllers/quizzesController');
const quizzesRouter = express.Router();

const bodyParser = require('body-parser');
quizzesRouter.use(bodyParser.json());

quizzesRouter.get('/', showQuizzes);
quizzesRouter.post('/', addQuiz);
quizzesRouter.put('/:userid', updateQuiz);

module.exports = quizzesRouter;