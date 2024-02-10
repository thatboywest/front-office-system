// server/routes/login.js
const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const User = require("../models/SigninSchema");

const router = express.Router();

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.post("/", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(401)
        .json({ error: "Invalid credentials. Please sign up or try again." });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res
        .status(401)
        .json({ error: "Invalid credentials. Please sign up or try again." });
    }

    if (user.role === "cashier") {
      return res.json({ redirect: "/home" });
    } else if (user.role === "driver") {
      return res.json({ redirect: "/driver" });
    }

    res.status(200).json({ message: "Login successful", user });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
