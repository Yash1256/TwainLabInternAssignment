const express = require("express");
const workController = require("./../Controller/workController");
const partyController = require("./../Controller/partyController");
const authController = require("./../Controller/authController");
const router = express.Router();

router
  .route("/")
  .post(
    authController.protectAccess,
    workController.newWork
  );

router.route("/:id").patch(workController.uploadRating);

module.exports = router;
