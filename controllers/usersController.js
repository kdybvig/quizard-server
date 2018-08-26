const User = require('../models/UserModel');

module.exports.addUser = (req, res, next) => {
    const newUser = User(req.body);
    newUser.save();
    res.status(201).send(newUser);
};

module.exports.showUsers = (req, res) => {
    User.find({}, (err, users) => {
        if (err) res.send(err);
        res.json(users);
    });   
}

module.exports.changePassword = (req, res) => {
    const id = req.body._id;
    const newPass = req.body.password;
    User.findById(id, (err, user) => {
        if (err) res.send(err);
        user.password = newPass;
        user.save((err, newUser) => {
          if (err) res.send(err);
          res.send(newUser);
        });
      });
};
