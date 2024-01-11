const express = require("express");
const userController = require("../controllers/user-controllers");
const { check } = require("express-validator");

const router = express.Router();

router.post(
  "/login/",
  [
    check("prn").toUpperCase().isLength({ max: 8, min: 8 }),
    check("password").isLength({ min: 2 }),
  ],
  userController.loginUser
);

router.post("/updateprofile", userController.updateProfile);

router.post("/updatepassword", userController.updatePassword);

router.post("/applydrive/:cid", userController.applyDrive);

router.post(
  "/register/student",
  [
    check("prn").toUpperCase().isLength({ max: 8, min: 8 }),
    check("password").isLength({ min: 2 }),
  ],
  userController.loginUser
);

module.exports = router;
