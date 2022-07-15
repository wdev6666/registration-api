const createPost = async (userId, params) => {
  params.UserId = userId;
  return await db.Post.create(params);
};

const getPosts = async (userId) => {
  return await db.Post.findAll({
    where: { UserId: userId },
  });
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

module.exports = { createPost, getPosts, getPost, likePost };
