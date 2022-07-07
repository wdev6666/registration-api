const express = require("express");
const router = express.Router();
const { registerSchema } = require("../_helpers/schema");
const { authorize } = require("../middlewares/authorize");
const userController = require("../controllers/user.controller");

// Routes
router.post("/register", registerSchema, userController.register);
router.get("/", authorize(), userController.getAll);

module.exports = router;