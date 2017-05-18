const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const testSchema = new Schema({

  objectType: String,
  objectName: String,
  isAdmin: Boolean,
  objectDescription: String,
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  }

});

module.exports = mongoose.model("Test", testSchema);
