const express = require("express");
const authController = require("../Controller/authController");
const partyController = require("../Controller/partyController");
const partyApplicationRoutes = require("./../routes/partyApplicationRoutes");
const router = express.Router();

router.use("/:partyName/application", partyApplicationRoutes);

router
  .route("/")
  .get(authController.protectAccess, partyController.getParty)
  .post(authController.protectAccess, partyController.registerParty);

router
  .route("/uploadRating/:id")
  .patch(authController.protectAccess, partyController.uploadRating);

router
  .route("/:partyName")
  .patch(
    authController.protectAccess,
    partyController.protectAccess,
    partyController.updateParty
  )
  .delete(
    authController.protectAccess,
    partyController.protectAccess,
    partyController.deleteParty
  );

module.exports = router;
