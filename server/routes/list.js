const express = require("express");
const { isAuthenticated } = require("../controllers/auth");
const { listHandler, allListItems } = require("../controllers/list");
const router = express.Router();

router
  .route("/list/:id")
  .post(isAuthenticated, listHandler)
  .get(isAuthenticated, allListItems);

module.exports = router;
