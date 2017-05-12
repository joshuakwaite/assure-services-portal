const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const testSchema = new Schema({

  objectType: String,
  objectName: String,
  isAdmin: Boolean,
  objectDescription: String

});

module.exports = mongoose.model("Test", testSchema);
