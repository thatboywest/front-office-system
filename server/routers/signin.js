// Import necessary modules and dependencies
const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const User = require("../models/SigninSchema");

const router = express.Router();

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.post("/", async (req, res) => {
  const { name, stationId, email, password, role, } = req.body;

  try {
    // Check if the email is already registered
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email is already in use" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user instance
    const newUser = new User({
      name,
      stationId,
      email,
      role,
      password: hashedPassword,
    });

    
    const savedUser = await newUser.save();

    
    res.status(201).json({ message: "Signup successful", user: savedUser });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
