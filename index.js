const express = require('express');
const app = express();
const PORT = process.env.PORT || 1986;
const bodyParser = require('body-parser');
app.use(bodyParser.json());

//routers
const usersRouter = require('./routes/usersRouter')
app.use('/users', usersRouter);
const quizzesRouter = require('./routes/quizzesRouter')
app.use('/quizzes', quizzesRouter);
//app.use('/quizzes', quizzesRouter);

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://kdybvig:Kwiz123@ds141641.mlab.com:41641/quizard", { useNewUrlParser: true });
const userModel = require("./models/UserModel");


app.listen(PORT, (err) => {
    if(err) {
        return err
    } else {
        console.log(`Server is listening on PORT ${PORT}`);
    }
})