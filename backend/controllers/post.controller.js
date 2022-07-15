const postService = require("../services/post.service");

const createPost = (req, res, next) => {
  postService
    .createPost(req.user.id, req.body)
    .then(() => res.json({ message: "Post added!" }))
    .catch(next);
};

const getPosts = (req, res, next) => {
  postService
    .getPosts(req.user.id)
    .then((posts) => res.json(posts))
    .catch(next);
};

const getPost = (req, res, next) => {
  postService
    .getPost(req.params.id)
    .then((post) => res.json(post))
    .catch(next);
};

const likePost = (req, res, next) => {
  postService
    .likePost(req.params.id, req.user.id)
    .then(() => res.json({ message: "Liked!" }))
    .catch(next);
};

module.exports = { createPost, getPosts, getPost, likePost };
