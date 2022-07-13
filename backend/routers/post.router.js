const express = require("express");
const router = express.Router();
const authorize = require("../middlewares/authorize");
const postController = require("../controllers/post.controller");

router.get("/", authorize(), postController.getPosts);
router.post("/", authorize(), postController.createPost);

module.exports = router;
