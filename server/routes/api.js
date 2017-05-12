const express = require("express");
const testRoute = express.Router();
const Test = require("../models/test");



testRoute.route("/")
  .get(function (req, res) {
    Test.find({}, function (err, test) {
      if (err) return res.status(500).send(err);
      res.send(test);
    });
  })

  .post(function (req, res) {
    let test = new Test(req.body);

    test.save(function (err) {
      if (err)
        return res.status(500).send(err);
      res.send(test);
    });


  });

testRoute.delete("/:id", function (req, res) {
  Test.findOneAndRemove({_id: req.params.id},
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
  Test.findOneAndUpdate({_id: req.params.id}, req.body, {new: true}, function (err, updatedTest) {
    if (err)
      return res.status(500).send(err);
    res.send(updatedAssignment)
  });
});

testRoute.get("/:id", function (req, res) {
  Assignment.findOne({_id: req.params.id}, function (err, test) {
    if (err) return res.status(500).send(err);
    res.send(test);
  });
});

module.exports = testRoute;
