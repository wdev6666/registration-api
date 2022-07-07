const express = require("express");
const router = express.Router();
const { registerSchema } = require("../_helpers/schema");
const userController = require("../controllers/user.controller");

// Routes
router.post("/register", registerSchema, userController.register);

module.exports = router;