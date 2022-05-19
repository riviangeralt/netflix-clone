const express = require("express");
const { isAuthenticated } = require("../controllers/auth");
const router = express.Router();
const {
  createProfile,
  getProfile,
  updateProfile,
  deleteProfile,
  getAllProfiles,
} = require("../controllers/profile");

router.route("/create/profile").post(isAuthenticated, createProfile);
router
  .route("/profile/:id")
  .get(isAuthenticated, getProfile)
  .put(isAuthenticated, updateProfile)
  .delete(isAuthenticated, deleteProfile);
router.route("/profiles").get(isAuthenticated, getAllProfiles);

module.exports = router;
