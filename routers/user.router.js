const express = require("express");
const router = express.Router();
const userSchema = require("../_helpers/schema");
const authorize = require("../middlewares/authorize");
const userController = require("../controllers/user.controller");

// Routes
router.post("/register", userSchema.registerSchema, userController.register);
router.post("/login", userSchema.loginSchema, userController.login);
router.get("/", authorize(), userController.getAll);
router.get("/current", authorize(), userController.getCurrent);
router.get("/:id", authorize(), userController.getById);
router.put("/:id", authorize(), userSchema.updateSchema, userController.update);
router.delete("/:id", authorize(), userController.delete);

module.exports = router;
