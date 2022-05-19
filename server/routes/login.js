const express = require("express");
const { createUser, loginUser, logoutUser } = require("../controllers/login");
const router = express.Router();

router.route("/register").post(createUser);
router.route("/login").post(loginUser);
router.route("/logout").post(logoutUser);

module.exports = router;
