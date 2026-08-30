const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  Username: {
    type: String,
    unique:[true, "Username already exists"],
    required: true
  },
  email: {
    type: String,
    required:[true, "Email already exists"],
    unique: true
  },
  password: {
    type: String,
    required: true
  }
});
module.exports = mongoose.model("User", userSchema);