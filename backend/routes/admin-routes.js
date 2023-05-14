const express = require("express");
const adminController = require("../controllers/admin-controllers");
const { check } = require("express-validator");

const router = express.Router();

router.post(
  "/login/",
  [
    check("email").normalizeEmail().isEmail(),
    check("password").isLength({ min: 2 }),
  ],
  adminController.loginAdmin
);

router.post("/adddrive/", adminController.addDrive);

router.get("/getdrives/", adminController.getDrives);
router.get("/dashboard/", adminController.dashboard);

router.get("/company/:cid", adminController.getCompanyById);

router.get("/appliedstudents/:cid", adminController.getAppliedStudents);
router.get("/eligiblestudents/:cid", adminController.getEligibleStudents);
router.post("/movetoapply/:cid", adminController.applyForDrive);
router.post("/movetoplace/:cid", adminController.placeStudent);
router.get("/getselectedstudents/", adminController.getSelectedStudents);

module.exports = router;
