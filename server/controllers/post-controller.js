const PostModel = require("../models/PostModel");

exports.createPost = async (req, res) => {
  const { body, category, subcategory, title } = req.body;

  const { username } = req.user;
  const author = req.user;

  try {
    const post = await new PostModel({
      username,
      body,
      title,
      category,
      subcategory,
      author,
    });
    await post.save();
    res.status(201).json({ success: true, message: "post created" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllPosts = async (req, res) => {
  try {
    const posts = await PostModel.find();
    res.status(200).json(posts);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};
exports.vote = async (req, res) => {
  const { postId, voteType } = req.body;

  try {
    const post = await PostModel.findById({ _id: postId });

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    if (voteType === "upvote") {
      post.vote += 1;
    }
    if (voteType === "downvote") {
      post.vote -= 1;
    }

    await post.save();
    res.status(200).json({ post, message: "Post updated" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
