const express = require("express");
const router = express.Router();
const CompanyDetails = require("../models/drive"); // Assuming CompanyDetails is defined in the drive model

router.get("/images", async (req, res, next) => {
  try {
    const companyData = await CompanyDetails.findOne();
    res.json({ images: companyData ? companyData.companylogos || [] : [] });
  } catch (error) {
    console.error("Error fetching company logos from MongoDB:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
