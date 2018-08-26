const express = require('express');
const {showQuizzes, addQuiz} = require('../controllers/quizzesController');
const quizzesRouter = express.Router();

const bodyParser = require('body-parser');
quizzesRouter.use(bodyParser.json());

quizzesRouter.get('/', showQuizzes);
quizzesRouter.post('/', addQuiz);

module.exports = quizzesRouter;