const mongoose = require("mongoose");

const CommentSchema = mongoose.Schema(
  {
    username: { type: String, required: true },
    body: { type: String, required: true },

    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserModel",
    },
    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PostModel",
    },
    parentComment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CommentModel",
    },
    subcomments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "CommentModel",
      },
    ],
    vote: {
      type: Number,
      default: 0,
    },
    depth: {
      type: Number,
      default: 1,
    },
    votedBy: [
      {
        user: {
          type: String,
        },

        voteType: {
          type: String,
          enum: ["upvote", "downvote"],
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const CommentModel = mongoose.model("CommentModel", CommentSchema);

module.exports = CommentModel;
