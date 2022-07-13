const createPost = async (userId, params) => {
    params.UserId = userId;
    return await db.Post.create(params);
};

const getPosts = async (userId) => { 
    return await db.Post.findAll({where: {UserId: userId}});
};

module.exports = { createPost, getPosts };