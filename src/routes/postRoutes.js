const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");

const {
  createPost,
  getMyPosts,
  getPublicPosts,
  getPostById,
  updatePost,
  deletePost,
} = require("../controllers/postController");

router.post("/", auth, createPost);
router.get("/", auth, getMyPosts);
router.get("/public", getPublicPosts);
router.get("/:id", getPostById);
router.put("/:id", auth, updatePost);
router.delete("/:id", auth, deletePost);

module.exports = router;
