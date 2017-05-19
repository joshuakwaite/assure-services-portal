let mongoose = require("mongoose");
let Schema = mongoose.Schema;
let bcrypt = require("bcrypt");


let userSchema = new Schema({
  firstName: String,
  lastName: String,
  userType: String,
  companyName: String,
  salesforceId: String,
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  admin: {
    type: Boolean,
    default: false
  }
});

userSchema.pre("save", function (next) {
  let user = this;
  if (!user.isModified("password")) return next();

  bcrypt.hash(user.password, 10, function (err, hash) {
    if (err) return next(err);

    user.password = hash;
    next();
  });
});

userSchema.methods.checkPassword = function(passwordAttempt, callback) {
  bcrypt.compare(passwordAttempt, this.password, function (err, isMatch) {
    if (err) return callback(err);
    callback(null, isMatch);
  });
};

userSchema.methods.withoutPassword = function () {
  let user = this.toObject();
  delete user.password;
  return user;
};

module.exports = mongoose.model("User", userSchema);

