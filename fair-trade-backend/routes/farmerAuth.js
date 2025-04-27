const express = require("express");
const bcrypt = require("bcryptjs");
const Farmer = require("../models/Farmer");
const router = express.Router();

// Register Farmer
router.post("/register", async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;
    const existing = await Farmer.findOne({ email });
    if (existing)
      return res.status(400).json({ message: "Email already registered" });
    const hashedPassword = await bcrypt.hash(password, 10);
    const farmer = new Farmer({ name, email, password: hashedPassword, phone });
    await farmer.save();
    res.status(201).json({ message: "Farmer registered successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Login Farmer
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const farmer = await Farmer.findOne({ email });
    if (!farmer)
      return res.status(400).json({ message: "Invalid credentials" });
    const isMatch = await bcrypt.compare(password, farmer.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });
    res.json({
      message: "Login successful",
      farmer: { id: farmer._id, name: farmer.name, email: farmer.email },
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
