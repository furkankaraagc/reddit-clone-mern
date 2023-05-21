const CommentModel = require("../models/CommentModel");
const PostModel = require("../models/PostModel");

exports.createComment = async (req, res) => {
  const { username, _id } = req.user;
  const { body, post, parentCommentId } = req.body;
  try {
    if (parentCommentId) {
      const parentComment = await CommentModel.findById(parentCommentId);
      const relatedPost = await PostModel.findById(post);
      const newSubcomment = await new CommentModel({
        body,
        post,
        author: _id,
        username,
        parentComment: parentCommentId,
        depth: parentComment.depth + 1,
      });
      const savedSubcomment = await newSubcomment.save();

      parentComment.subcomments.push(newSubcomment);
      relatedPost.comments.push(newSubcomment._id);

      await relatedPost.save();

      await parentComment.save();
      res
        .status(201)
        .json({ savedSubcomment, message: "Subcomment created successfully" });
      return;
    }

    const relatedPost = await PostModel.findById(post);
    const comment = await new CommentModel({
      body,
      post,
      author: _id,
      username,
      parentComment: null,
    });
    relatedPost.comments.push(comment._id);

    await relatedPost.save();
    await comment.save();
    res.status(201).json({ message: "Comment created successfully" });
  } catch (error) {
    res
      .status(400)
      .json({ error: error.message, message: "Something went wrong" });
  }
};
exports.getComments = async (req, res) => {
  const { postId } = req.params;
  try {
    const comments = await CommentModel.find({ post: postId });
    res.status(200).json(comments);
  } catch (error) {
    res.status(200).json({ error: error.message });
  }
};
exports.commentVote = async (req, res) => {
  const { commentId, voteType } = req.body;
  const user = req.user;

  try {
    const comment = await CommentModel.findById({ _id: commentId });

    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    const alreadyVoted = comment.votedBy.some(
      (obj) => obj.user === user._id.toString()
    );

    if (alreadyVoted) {
      if (comment.votedBy.some((obj) => obj.voteType === voteType)) {
        if (voteType === "upvote") {
          comment.vote -= 1;
        } else if (voteType === "downvote") {
          comment.vote += 1;
        }
        const filter = {
          _id: comment._id,
        };
        const update = {
          $pull: {
            votedBy: {
              user: user._id.toString(),
            },
          },
        };

        await CommentModel.findByIdAndUpdate(filter, update);

        await comment.save();
        res.status(200).json({ comment, message: "Comment updated" });
      } else {
        if (voteType === "upvote") {
          comment.vote += 2;
        }
        if (voteType === "downvote") {
          comment.vote -= 2;
        }

        const index = comment.votedBy.findIndex(
          (element) => element.user === user._id.toString()
        );
        comment.votedBy[index].voteType = voteType;
        await comment.save();
        res.status(200).json({ comment, message: "Comment updated" });
      }
    } else {
      comment.votedBy.push({ user: user._id, voteType: voteType });

      if (voteType === "upvote") {
        comment.vote += 1;
      }
      if (voteType === "downvote") {
        comment.vote -= 1;
      }

      await comment.save();
      res.status(200).json({ comment, message: "Comment updated" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
