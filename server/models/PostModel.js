const mongoose = require("mongoose");

const PostSchema = mongoose.Schema(
  {
    username: { type: String, required: true },
    title: { type: String, required: true },
    body: { type: String, required: true },
    category: {
      type: String,
      required: true,
    },
    subcategory: {
      type: String,
      required: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserModel",
    },
    vote: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const PostModel = mongoose.model("PostModel", PostSchema);

module.exports = PostModel;
