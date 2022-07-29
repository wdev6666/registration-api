const { post } = require("../routers/post.router");

const createPost = async (userId, params) => {
  params.UserId = userId;
  return await db.Post.create(params);
};

const getPosts = async (userId) => {
  let where = {};
  if (userId !== null) where = { UserId: userId };
  return await db.Post.findAll({
    where: where,
    include: [{ model: db.Like, attributes: ["UserId"], as: "likes" }],
  }).then((posts) => {
    return posts.map((post) => {
      let p = {
        id: post.id,
        desc: post.desc,
        img: post.img,
        createdAt: post.createdAt,
        updatedAt: post.updatedAt,
        UserId: post.UserId,
        likes: post.likes.map((like) => {
          return parseInt(like.UserId);
        }),
      };
      return p;
    });
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
  const l = await db.Like.findOne({ where: like });
  if (l) l.destroy();
  else await db.Like.create(like);
};

const getTimeline = async (userId) => {
  return getPosts(userId);
};

module.exports = { createPost, getPosts, getPost, likePost, getTimeline };
