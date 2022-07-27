const { post } = require("../routers/post.router");

const createPost = async (userId, params) => {
  params.UserId = userId;
  return await db.Post.create(params);
};

const getPosts = async (userId) => {
  return await db.Post.findAll({
    //where: { UserId: userId },
    include: [{ model: db.Like, attributes: ['id'], as: "likes" }],
    nest: true
    /*attributes: {
      include: [
        [
          db.Like,
          "likes",
          //db.sequelize.fn("COUNT", db.sequelize.col("likes.PostId")),
          //"likesCount",
        ],
      ],
    },
    include: [
      {
        model: db.Like,
        as: "likes",
        though: "likes",
        attributes: [],
        required: false,
      },
    ],*/
  }).then(posts => posts.map(post => { let newLikes = post.likes.map(like => { return like.id }); post.likes = newLikes; return post }));
};

const getPost = async (postId) => {
  return await db.Post.findByPk(postId, {
    attributes: {
      include: [
        [
          db.sequelize.fn("COUNT", db.sequelize.col("likes.PostId")),
          "likesCount",
        ],
      ],
    },
    include: [
      {
        model: db.Like,
        as: "likes",
        though: "likes",
        attributes: [],
        required: false,
      },
    ],
  });
};

const likePost = async (postId, userId) => {
  const like = { PostId: postId, UserId: userId };
  return await db.Like.create(like);
};

const getTimeline = async (userId) => {
  return [];
};

module.exports = { createPost, getPosts, getPost, likePost, getTimeline };
