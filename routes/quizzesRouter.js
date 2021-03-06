const express = require('express');
const {showQuizzes, showQuizzesByUser, showPublicQuizzesByUser, addQuiz, updateQuiz, deleteQuiz} = require('../controllers/quizzesController');
const quizzesRouter = express.Router();

const bodyParser = require('body-parser');
quizzesRouter.use(bodyParser.json());

quizzesRouter.get('/', showQuizzes);
quizzesRouter.get('/user/:username', showQuizzesByUser)
quizzesRouter.get('/public/user/:username', showPublicQuizzesByUser)
quizzesRouter.post('/', addQuiz);
quizzesRouter.put('/:quizid', updateQuiz);
quizzesRouter.delete('/delete/:quizid',  deleteQuiz)

module.exports = quizzesRouter;