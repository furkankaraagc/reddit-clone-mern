const express = require("express");
const { protect } = require("../middleware/auth-middleware");

const router = express.Router();
const { register, login } = require("../controllers/auth-controller");
const {
  createPost,
  getAllPosts,
  vote,
} = require("../controllers/post-controller");
const {
  createCategory,
  createSubcategory,
  getAllCategories,
} = require("../controllers/category-controller");

router.post("/login", login);
router.post("/register", register);

router.post("/createPost", protect, createPost);

router.post("/createCategory", protect, createCategory);
router.post("/createSubcategory", protect, createSubcategory);

router.get("/categories", protect, getAllCategories);

router.put("/vote", protect, vote);

router.get("/", getAllPosts);

module.exports = router;
