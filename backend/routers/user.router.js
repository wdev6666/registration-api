const express = require("express");
const router = express.Router();
const userSchema = require("../_helpers/schema");
const authorize = require("../middlewares/authorize");
const userController = require("../controllers/user.controller");

// Routes
router.post("/register", userSchema.registerSchema, userController.register);
router.post("/login", userSchema.loginSchema, userController.login);
router.get("/", authorize(), userController.getAll);
router.get("/friends/:id", authorize(), userController.getFriends);
//router.get("/current", authorize(), userController.getCurrent);
router.get("/:id", authorize(), userController.getById);
router.put("/:id", authorize(), userSchema.updateSchema, userController.update);
router.delete("/:id", authorize(), userController.delete);
router.put("/follow/:id", authorize(), userController.follow);
router.get("/otp/email/generate", authorize(), userController.sendOtp);
router.post("/otp/email/verify", authorize(), userController.verifyOtp);
router.get("/otp/mobile/generate", authorize(), userController.sendMobileOtp);
router.post("/otp/mobile/verify", authorize(), userController.verifyMobileOtp);

module.exports = router;
