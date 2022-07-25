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
    //include: [
    //  { model: db.User, attributes: ["id"], as: "followers" },
    //  { model: db.User, attributes: ["id"], as: "followings" },
    //],
  });
  if (!user || !(await bcrypt.compare(password, user.hash)))
    throw "Username or password is incorrect!";
  // Authentication successful
  const token = jwt.sign({ sub: user.id }, config.secret, { expiresIn: "7d" });
  return { ...omitHash(user.get()), token };
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

  //params.email_otp = generateOtp();

  // Save user
  const user = await db.User.create(params);
  //sendOtp(user, user.email_otp);
};

const getAll = async () => {
  //return await db.User.findAll({ attributes: { include: [{ model: db.Post, as: "posts" }] } });
  return await db.User.findAll({
    include: [{ model: db.Post, as: "posts" }],
  });
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
  const user = await getUser(userId);
  await user.destroy();
};

const follow = async (userId, followerId) => {
  let user = await db.User.findByPk(userId);
  const { followable, follower } = await validateFollowable(userId, followerId);
  await followable.addFollower(follower);
  //user.addFollower(follower);
  //user.save();
};

// Helper functions

const getUser = async (userId) => {
  const user = await db.User.findByPk(userId);
  if (!user) throw "User not found";
  return user;
};

const getFriends = async (userId) => {
  if (userId) return [];
  return [];
};

const omitHash = (user) => {
  const { hash, ...userWithoutHash } = user;
  return userWithoutHash;
};

const validateFollowable = async (userId, id) => {
  try {
    const follower = await db.User.findOne({
      where: { id: userId },
    });

    const profile = await db.User.findOne({ where: { id } });
    if (follower.id === profile.userId) {
      throw "MESSAGE.FOLLOW_ERROR1";
    }

    const followable = await profile.get();

    return { followable, follower };
  } catch (error) {
    throw error;
  }
};

module.exports = {
  login,
  create,
  getAll,
  getUser,
  update,
  delete: _delete,
  getFriends,
  follow,
};
