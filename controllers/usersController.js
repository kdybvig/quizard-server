const User = require('../models/UserModel');
const bcrypt = require('bcrypt');

module.exports.findUser = (req, res) => {
    const thisUser = User(req.body);
    const {username, password} = thisUser;
    User.findOne({username: username}, (err, user) => {
        if (err) return res.json('Unknown Error');
        if (!user) return res.status(404).json('User not found.');
        bcrypt.compare(password, user.password, (err, match) => {
            if(err) return res.json('Unknown Error');
            if(!match) return res.json('Invalid Password');
            res.json(user)
        })
    })
}

module.exports.addUser = (req, res) => {
    const newUser = User(req.body);
    User.findOne({username: newUser.username}, (err,user) => {
        if(err) return res.json(err);
        if(user) return res.json('Username already exists')
        bcrypt.hash(newUser.password, 10, (err, hash) => {
            if (err) res.status(500).send('Encryption failure.');
            newUser.password = hash;
            newUser.save();
            res.status(201).send(newUser);
        })
    })
};

module.exports.showUsers = (req, res) => {
    User.find({}, (err, users) => {
        if (err) return res.send(err);
        res.json(users);
    });   
};

module.exports.changePassword = (req, res) => {
    const username = req.body.username;
    const newPass = req.body.newPassword;
    const oldPass = req.body.password;
    User.findOne({username: username}, (err, user) => {
        if(!user) return res.send('User not found.')
        if (err) return res.send(err);
        bcrypt.compare(oldPass, user.password, (err, match) => {
            if(!match) return res.send('Invalid password.');
            bcrypt.hash(newPass, 10, (err, hash) => {
                if (err) res.status(500).send('Encryption failure.');
                user.password = hash;
                user.save((err, newUser) => {
                    if (err) res.send(err);
                    res.send(newUser);
                });
            })
        })
       
    });
};
