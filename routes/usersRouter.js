const express = require('express');
const usersController = require('../controllers/usersController');
const usersRouter = express.Router();

const bodyParser = require('body-parser');
usersRouter.use(bodyParser.json());

usersRouter.get('/', usersController.showUsers);
usersRouter.post('/', usersController.addUser);
usersRouter.put('/', usersController.changePassword);

module.exports = usersRouter;