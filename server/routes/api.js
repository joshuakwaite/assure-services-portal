const express = require("express");
const testRoute = express.Router();
const Test = require("../models/test");



testRoute.route("/")
  .get(function (req, res) {
    Test.find({user: req.user._id}, function (err, test) {
      if (err) return res.status(500).send(err);
      res.send(test);
    });
  })

  .post(function (req, res) {
    let test = new Test(req.body);

    test.user = req.user;

    test.save(function (err, newTest) {
      if (err)
        return res.status(500).send(err);
      res.send(newTest);
    });


  });

testRoute.delete("/:id", function (req, res) {
  Test.findOneAndRemove({_id: req.params.id, user: req.user._id},
    function (err, test) {
      if (err)
        return res.status(500).send(err);
      res.send({
        message: "Successfully deleted your test",
        success: true
      });
    })

});

testRoute.put("/:id", function (req, res) {
  Test.findOneAndUpdate({_id: req.params.id, user: req.user._id}, req.body, {new: true}, function (err, updatedTest) {
    if (err)
      return res.status(500).send(err);
    res.send(updatedTest)
  });
});

testRoute.get("/:id", function (req, res) {
  Assignment.findOne({_id: req.params.id, user: req.user._id}, function (err, test) {
    if (err) return res.status(500).send(err);
    res.send(test);
  });
});

module.exports = testRoute;
