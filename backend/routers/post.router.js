const express = require("express");
const router = express.Router();
const authorize = require("../middlewares/authorize");
const postController = require("../controllers/post.controller");

router.get("/", authorize(), postController.getPosts);
router.post("/", authorize(), postController.createPost);
//router.get("/:id", authorize(), postController.getPost);
router.put("/:id/like", authorize(), postController.likePost);
router.get("/", authorize(), postController.getTimeline);
router.get("/profile/:UserId", authorize(), postController.getPosts);

module.exports = router;
