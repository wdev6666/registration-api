const config = require("../config/config.json");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const db = require("../_helpers/db");

const login = async ({ email, password }) => {
  const user = await db.User.scope("withHash").findOne({ where: { email } });
  if (!user || !(await bcrypt.compare(password, user.hash)))
    throw "Username or password is incorrect!";
  // Authentication successful
  const token = jwt.sign({ sub: user.id }, config.secret, { expiresIn: "7d" });
  return { ...omitHash(user.get()), token };
};

const create = async (params) => {
  console.log(params);
  // Validate
  if (await db.User.findOne({ where: { email: params.email } })) {
    throw 'Email Id"' + params.email + '" is already taken';
  }

  // Hash password
  if (params.password) {
    params.hash = await bcrypt.hash(params.password, 10);
  }

  // Save user
  await db.User.create(params);
};

const getAll = async () => {
  return await db.User.findAll();
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

// Helper functions

const getUser = async (userId) => {
  const user = await db.User.findByPk(userId);
  if (!user) throw "User not found";
  return user;
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
};
