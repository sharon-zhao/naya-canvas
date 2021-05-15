const mongoose = require("mongoose");

const User= mongoose.model(
  "User",
  new mongoose.Schema({
    title: String,
    author: String,
    images: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Image"
      }
    ]
  })
);

module.exports = User;
