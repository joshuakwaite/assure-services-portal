// routes/authRoutes.js

let express = require("express");
let authRoutes = express.Router();
let User = require("../models/user");
let jwt = require("jsonwebtoken");
let config = require("../config");
let crypto = require("crypto");
let async = require("async");

authRoutes.post("/login", function (req, res) {

  User.findOne({email: req.body.email}, function (err, user) {
    if (err) return res.status(500).send(err);

    if (!user) {
      return res.status(401).send("Username or password is incorrect.")
    } else if (user) {
      user.checkPassword(req.body.password, function (err, match) {
        if (err) throw (err);
        if (!match) res.status(401).send("Username or password is incorrect.");
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

authRoutes.post("/forgot-password", function (req, res, next) {
  /*
   * async.waterfall takes an array of functions to run one after the other. The last parameter to each of these
   * functions should be a callback function that you'll execute when you're ready to move to the next function in the
   * array. Whatever parameters you pass to this callback function (which we've called `done`) are the parameters that
   * will be passed to the next function in the array (assuming no errors).
   * */
  async.waterfall([
    function (done) {
      crypto.randomBytes(20, function (err, buf) {
        if (err) return done(err);
        let token = buf.toString("hex");

        // Pass `null` for the "error" and the token to the next function in the array
        done(null, token);
      });
    },
    // Received the token from the previous function
    function (token, done) {

      // Find the user by their email address provided in the req.body
      User.findOne({email: req.body.email}, function (err, user) {
        if (err) return res.send(err);

        // If they submitted an email that doesn't belong to any users in the database:
        else if (!user) return res.status(404).send({
          success: false,
          message: "The email " + req.body.email + " isn't registered in the system"
        });

        // Set the password reset token on the user object and give them 1 hour to click the link we'll send
        user.resetPasswordToken = token;
        user.resetPasswordExpires = Date.now() + 3600000;  // 1 hour
        user.save(function (err) {

          // pass the token and the user object to the next function in the array
          done(err, token, user);
        });
      });
    },
    function (token, user, done) {

      // Create a new email using the sendgrid npm package
      let helper = require("sendgrid").mail;

      // Who you want this email to be "coming from". This doesn't have to be a real email address.
      let fromEmail = new helper.Email("noreply@assure.co");

      // Send the email to the address provided by the user trying to reset their password
      let toEmail = new helper.Email(user.email);

      // Email subject line
      let subject = "Your TodoApp password reset link is here";

      // Actual content of the email. You can make this look pretty by using text/html instead of text/plain
      let content = new helper.Content("text/plain", 'You are receiving this because you (or someone else) ' +
        'have requested the reset of the password for your account.\n\n' +
        'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
        'http://' + req.headers.host + '/reset/' + token + '\n\n' +
        'If you did not request this, please ignore this email and your password will remain unchanged.\n');

      // Put all those pieces together to make an email object
      let mail = new helper.Mail(fromEmail, subject, toEmail, content);

      // Prove you're allowed to use sendgrid by providing your API key
      let sendgrid = require("sendgrid")(config.sendgridApiKey);

      // Create a request object
      let request = sendgrid.emptyRequest({
        method: 'POST',
        path: '/v3/mail/send',
        body: mail.toJSON()
      });

      // Send the request to the sendgrid API, which will send the email for you!
      sendgrid.API(request, function (err, response) {
        if (err) return res.status(500).send(err);
        done(null, "done");
      });
    }

    // This last function (outside the array of functions) is called regardless what happens. If there is an error
    // at any point in the array of functions, it'll skip the remaining functions in the array and call this one
    // instead. If there are no errors, this will get called last, but with `null` for the `err` parameter.
  ], function (err, result) {
    if (err) return res.status(500).send(err);

    // Send a response back to the frontend.
    res.status(202).send({success: true, message: "Mail sent successfully!"});
  })
});

authRoutes.post("/reset/:resetToken", function (req, res) {
  User.findOne({resetPasswordToken: req.params.resetToken}, function (err, user) {
    if (err) {
      res.status(500).send(err);
    } else {
      user.password = req.body.password || user.password;
      user.resetPasswordToken = undefined;
      user.resetPasswordExpires = undefined;

      user.save(function (err, user) {
        res.send({success: true, message: "Password successfully reset!"});
      });
    }
  });
});

module.exports = authRoutes;
