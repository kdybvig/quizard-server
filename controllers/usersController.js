const User = require('../models/UserModel');
const bcrypt = require('bcrypt');

module.exports.addUser = (req, res, next) => {
    const newUser = User(req.body);
    bcrypt.hash(newUser.password, 10, (err, hash) => {
        if (err) res.status(500).send('Encryption failure.');
        newUser.password = hash;
        newUser.save();
        res.status(201).send(newUser);
    })
};

module.exports.showUsers = (req, res) => {
    User.find({}, (err, users) => {
        if (err) return res.send(err);
        res.json(users);
    });   
};

module.exports.changePassword = (req, res) => {
    const id = req.body._id;
    const newPass = req.body.newPassword;
    const oldPass = req.body.password;
    User.findById(id, (err, user) => {
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
