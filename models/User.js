const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: { type: String, unique: true, index: true },
    email: { type: String, unique: true, index: true },
    bio: String,
    image: String,
    hash: String,
    salt: String
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
