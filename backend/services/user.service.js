const config = require("../config/config.json");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const db = require("../_helpers/db");
const { sendOtp, generateOtp } = require("./otp.service");
//const { Sequelize } = require("sequelize/types");
//const sequelize = new Sequelize();

const login = async ({ email, password }) => {
  const user = await db.User.scope("withHash").findOne({
    where: { email },
  });
  if (!user || !(await bcrypt.compare(password, user.hash)))
    throw "Username or password is incorrect!";
  // Authentication successful
  const token = jwt.sign({ sub: user.id }, config.secret, { expiresIn: "7d" });
  let loggedInUser = await getUser(user.id);
  return { ...loggedInUser, token };
  //return { ...omitHash(user.get()), token };
};

const create = async (params) => {
  // Validate
  if (await db.User.findOne({ where: { email: params.email } })) {
    throw 'Email Id"' + params.email + '" is already taken';
  }

  // Hash password
  if (params.password) {
    params.hash = await bcrypt.hash(params.password, 10);
  }

  // If no role provided
  if (params.role === undefined || params.role === null || params.role === "")
    params.role = "Admin";
  //params.email_otp = generateOtp();

  // Save user
  const user = await db.User.create(params);
  //sendOtp(user, user.email_otp);
};

const getAll = async () => {
  let users = await db.User.findAll();
  return users;
};

const update = async (userId, params) => {
  const user = await getUser(userId);

  // Validation
  const newEmail = params.email && user.email !== params.email;
  if (newEmail && (await db.User.findOne({ where: { email: params.email } }))) {
    throw 'Email Id "' + params.email + '" is already taken!';
  }

  // Hash password if it's entered
  if (params.password) {
    params.hash = await bcrypt.hash(params.params, 10);
  }

  // Copy params to user and save
  Object.assign(user, params);
  await user.save();

  return omitHash(user.get());
};

const _delete = async (userId) => {
  const user = await db.User.findByPk(userId);
  await user.destroy();
};

const follow = async (FollowId, UserId) => {
  let follow = await db.Follower.findOne({
    where: { FollowId: FollowId, UserId: UserId },
  });
  if (follow === null) {
    follow = await db.Follower.create({ FollowId: FollowId, UserId: UserId });
    return follow;
  } else {
    throw new Error(`You are following user with userId: ${UserId} already!`);
  }
};

const unfollow = async (FollowId, UserId) => {
  let follow = await db.Follower.findOne({
    where: { FollowId: FollowId, UserId: UserId },
  });
  if (follow !== null) {
    await follow.destroy();
    return follow;
  } else {
    throw new Error(`You are not following user with userId: ${UserId}!`);
  }
};

// Helper functions

const getUser = async (userId) => {
  const user = await db.User.findByPk(userId);
  let newUser = {};
  if (!user) throw "User not found";
  const usersIFollow = await getUsersIFollow(userId);
  const usersFollowMe = await getUsersFollowMe(userId);
  newUser.id = userId;
  newUser.firstName = user.firstName;
  newUser.lastName = user.lastName;
  newUser.email = user.email;
  newUser.mobile = user.mobile;
  newUser.followers = usersIFollow;
  newUser.followings = usersFollowMe;
  return newUser;
};

const getFriends = async (UserId) => {
  const friendsId = await getUsersFollowMe(UserId);
  let friends = [];
  friends = await db.User.findAll({ where: { id: friendsId } });
  return friends;
};

const getOnlineFriends = async (UserId) => {
  const friendsId = await getUsersFollowMe(UserId);
  let friends = [];
  friends = await db.User.findAll({ where: { id: friendsId } });
  return friends;
};

const getUsersIFollow = async (UserId) => {
  const usersIFollow = await db.Follower.findAll({ where: { UserId: UserId } });
  return usersIFollow.map((user) => {
    return user.FollowId;
  });
};

const getUsersFollowMe = async (UserId) => {
  const usersFollowMe = await db.Follower.findAll({
    where: { FollowId: UserId },
  });
  return usersFollowMe.map((user) => {
    return user.UserId;
  });
};

const getLikesByUser = async (UserId, PostId) => {
  const likes = await db.Like.findAll({
    where: { UserId: UserId, PostId: PostId },
  });
  return likes.map((like) => {
    return like.id;
  });
};

const omitHash = (user) => {
  const { hash, ...userWithoutHash } = user;
  return userWithoutHash;
};

module.exports = {
  login,
  create,
  getAll,
  getUser,
  update,
  delete: _delete,
  getFriends,
  getOnlineFriends,
  follow,
  unfollow,
};
