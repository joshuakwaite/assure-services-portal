let express = require("express");
let userInfoRoutes = express.Router();
let User = require("../models/user");
// let jwt = require("jsonwebtoken");
let config = require("../config");

userInfoRoutes.post("/change-password", function (req, res) {
  User.findById(req.user._id, function (err, user) {
    if (err) {
      res.status(500).send(err);
    } else {
      user.password = req.body.newPassword || user.password;
      user.save(function (err, user) {
        res.send({success: true, user: user.withoutPassword()});
      });
    }
  });
});

module.exports = userInfoRoutes;
