const express = require("express");
const authController = require("../Controller/authController");
const partyController = require("../Controller/partyController");
const applicationController = require("../Controller/applicationController");

const router = express.Router({ mergeParams: true });
router
  .route("/")
  .get(
    authController.protectAccess,
    partyController.protectAccess,
    applicationController.filterApplication
  )
  .post(
    authController.protectAccess,
    partyController.protectAccess,
    applicationController.applyInParty
  );

router
  .route("/changeAppStatus/:app_id")
  .patch(
    authController.protectAccess,
    partyController.protectAccess,
    applicationController.acceptApplication
  );

module.exports = router;
