const express = require("express");
const router = express.Router();
const userSchema = require("../_helpers/schema");
const authorize = require("../middlewares/authorize");
const userController = require("../controllers/user.controller");

// Routes
router.post("/register", userSchema.registerSchema, userController.register);
router.get("/", authorize(), userController.getAll);
router.post("/login", userSchema.loginSchema, userController.login);

module.exports = router;