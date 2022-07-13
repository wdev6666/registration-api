const postService = require("../services/post.service");

const createPost = (req, res, next) => { 
  postService.createPost(req.user.id, req.body).then(() => res.json({message: "Post added!"})).catch(next);
};

const getPosts = (req, res, next) => {
  postService.getPosts(req.user.id).then((posts) => res.json(posts)).catch(next);
};

module.exports = { createPost, getPosts };
