// authController protection is to be set in the post model but for checking purposes it has been set over here

const express = require("express");
const authController = require("../Controller/authController");
const userController = require("../Controller/userController");

const router = express.Router();

router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.get("/logout", authController.logout);
router.post("/forgotPassword", authController.forgotPassword);
router.patch("/resetPassword/:token", authController.resetPassword);
router.patch(
  "/updateMyPassword",
  authController.protectAccess,
  authController.updatePassword
);

router.get("/filteredUser", userController.filteredUser);

router
  .route("/")
  .get(authController.protectAccess, userController.getMe)
  .delete(
    authController.protectAccess,
    userController.deleteMe,
    authController.logout
  )
  .patch(authController.protectAccess, userController.updateMe);

router
  .route("/leaveParty")
  .post(authController.protectAccess, userController.leaveParty);

router
  .route("/uploadRating/:id")
  .patch(authController.protectAccess, userController.uploadRating);

router
  .route("/filterApplication")
  .get(authController.protectAccess, userController.allAppliedApplications);

router
  .route("/acceptApplication/:id")
  .patch(authController.protectAccess, userController.userAcceptApplication);

module.exports = router;
