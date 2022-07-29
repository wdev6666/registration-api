const postService = require("../services/post.service");

const createPost = (req, res, next) => {
  postService
    .createPost(req.user.id, req.body)
    .then(() => res.json({ message: "Post added!" }))
    .catch(next);
};

const getPosts = (req, res, next) => {
  const userId = req.params.UserId ? req.params.UserId : null;
  postService
    .getPosts(userId)
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

const getTimeline = (req, res, next) => {
  postService
    .getTimeline(req.user.id)
    .then((data) => res.json(data))
    .catch(next);
};

module.exports = { createPost, getPosts, getPost, likePost, getTimeline };
