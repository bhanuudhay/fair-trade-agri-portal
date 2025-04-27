const express = require("express");
const bcrypt = require("bcryptjs");
const Buyer = require("../models/Buyer");
const router = express.Router();

// Register Buyer
router.post("/register", async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;
    const existing = await Buyer.findOne({ email });
    if (existing)
      return res.status(400).json({ message: "Email already registered" });
    const hashedPassword = await bcrypt.hash(password, 10);
    const buyer = new Buyer({ name, email, password: hashedPassword, phone });
    await buyer.save();
    res.status(201).json({ message: "Buyer registered successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Login Buyer
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const buyer = await Buyer.findOne({ email });
    if (!buyer) return res.status(400).json({ message: "Invalid credentials" });
    const isMatch = await bcrypt.compare(password, buyer.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });
    res.json({
      message: "Login successful",
      buyer: { id: buyer._id, name: buyer.name, email: buyer.email },
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
