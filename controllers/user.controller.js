const userService = require("../services/user.service");
const otpService = require("../services/otp.service");

const register = (req, res, next) => {
  userService
    .create(req.body)
    .then(() => {
      res.json({ message: "Registration Successful!" });
    })
    .catch(next);
};

const login = (req, res, next) => {
  userService
    .login(req.body)
    .then((user) => res.json(user))
    .catch(next);
};

const getAll = (req, res, next) => {
  userService
    .getAll()
    .then((users) => res.json(users))
    .catch(next);
};

const getCurrent = (req, res, next) => {
  res.json(req.user);
};

const getById = (req, res, next) => {
  userService
    .getUser(req.params.id)
    .then((user) => {
      if (user === null)
        return next("user with user id: " + req.params.id + " not found!");
      res.json(user);
    })
    .catch(next);
};

const update = (req, res, next) => {
  userService
    .update(req.params.id, req.body)
    .then((user) => res.json(user))
    .catch(next);
};

const _delete = (req, res, next) => {
  userService
    .delete(req.params.id)
    .then(() => res.json({ message: "User deleted successfully" }))
    .catch(next);
};

const verifyOtp = (req, res, next) => { 
  otpService.verifyOtp(req.user.id, req.body.email_otp).then(() => res.json({message: "OTP verified!"})).catch(next);
};

module.exports = {
  register,
  getAll,
  login,
  getCurrent,
  getById,
  update,
  delete: _delete,
  verifyOtp
};
