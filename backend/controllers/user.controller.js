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

const getFriends = (req, res, next) => {
  userService
    .getFriends(req.params.id)
    .then((friends) => res.json(friends))
    .catch(next);
};

const follow = (req, res, next) => {
  console.log("2");
  userService
    .follow(req.user.id, req.params.UserId)
    .then(() => res.json({ message: "Followed" }))
    .catch(next);
};

const unfollow = (req, res, next) => {
  userService
    .unfollow(req.user.id, req.params.UserId)
    .then(() => res.json({ message: "Unfollowed" }))
    .catch(next);
};

const sendOtp = (req, res, next) => {
  const otp = otpService.generateOtp();
  const user = req.user;
  otpService.sendOtp(user, otp);
  user.email_otp = otp;
  user.email_otp_verified = false;
  userService.update(user.id, user);
  res.json({ message: "OTP sent." });
};

const verifyOtp = (req, res, next) => {
  const user = req.user;
  otpService
    .verifyOtp(req.user.id, req.body.email_otp)
    .then(() => {
      user.email_otp = "";
      user.email_otp_verified = true;
      userService.update(user.id, user);
      res.json({ message: "OTP verified!" });
    })
    .catch(next);
};

const sendMobileOtp = (req, res, next) => {
  const otp = otpService.generateOtp();
  const user = req.user;
  otpService.sendMessage(user, otp);
  user.mobile_otp = otp;
  user.mobile_otp_verified = false;
  userService.update(user.id, user);
  res.json({ message: "OTP sent." });
};

const verifyMobileOtp = (req, res, next) => {
  const user = req.user;
  otpService
    .verifyOtp(req.user.id, req.body.mobile_otp)
    .then(() => {
      user.mobile_otp = "";
      user.mobile_otp_verified = true;
      userService.update(user.id, user);
      res.json({ message: "OTP verified!" });
    })
    .catch(next);
};

module.exports = {
  register,
  getAll,
  login,
  getCurrent,
  getById,
  update,
  delete: _delete,
  getFriends,
  follow,
  unfollow,
  verifyOtp,
  sendOtp,
  sendMobileOtp,
  verifyMobileOtp,
};
