const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "PLEASE ADD A NAME"],
    },
    email: {
      type: String,
      required: [true, "PLEASE ADD A EMAIL"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "PLEASE ADD A EMAIL"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User",userSchema)