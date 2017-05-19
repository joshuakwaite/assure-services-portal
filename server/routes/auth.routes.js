// routes/authRoutes.js

let express = require("express");
let authRoutes = express.Router();
let User = require("../models/user");
let jwt = require("jsonwebtoken");
let config = require("../config");

authRoutes.post("/login", function (req, res) {

  User.findOne({email: req.body.email}, function (err, user) {
    if (err) return res.status(500).send(err);

    if (!user) {
      return res.status(401).send("Username or password is incorrect.")
    } else if (user) {
      user.checkPassword(req.body.password, function (err, match) {
        if (err) throw (err);
        if (!match) res.status(401).send({success: false, message: "Username or password is incorrect."});
        else {
          let token = jwt.sign(user.toObject(), config.secret, {expiresIn: "24h"});
          res.send({token: token, user:user.toObject(), success: true, message: "Here's your token!"})
        }
      });
    }
  });
});

authRoutes.post("/signup", function (req, res) {
  User.find({email: req.body.email}, function (err, existingUser) {
    if (err) return res.status(500).send(err);
    if (existingUser.length) return res.send('Email is already in use.');
    else {
      let newUser = new User(req.body);
      newUser.save(function (err, user) {
        if (err) return res.status(500).send('Email is already in use.');
        res.send({user: user.withoutPassword(), message: "Successfully created new user.", success: true});
      });
    }
  })
});

module.exports = authRoutes;
