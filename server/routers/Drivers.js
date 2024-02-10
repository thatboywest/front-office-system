// Import necessary modules and dependencies
const express = require("express");
const router = express.Router();
const SignupModel = require("../models/SigninSchema");

router.get("/", async (req, res) => {
  try {
    const drivers = await SignupModel.find({ role: 'driver' }, 'name');
    res.status(200).json(drivers);
  } catch (error) {
    console.error("Error fetching registered drivers:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});



module.exports = router;
