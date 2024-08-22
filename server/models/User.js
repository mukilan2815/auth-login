// models/User.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  uid: { type: String, required: true, unique: true },
  email: { type: String, required: true },
  displayName: { type: String },
  providerId: { type: String },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
