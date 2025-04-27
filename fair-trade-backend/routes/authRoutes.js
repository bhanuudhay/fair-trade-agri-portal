const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const Farmer = require("../models/Farmer");
const Buyer = require("../models/Buyer");

// Register new farmer
router.post("/register/farmer", async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;

    // Check if farmer exists
    const farmerExists = await Farmer.findOne({ email });
    if (farmerExists) {
      return res.status(400).json({
        success: false,
        error: "Farmer already exists with this email",
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create farmer
    const farmer = await Farmer.create({
      name,
      email,
      password: hashedPassword,
      phone,
    });

    res.status(201).json({
      success: true,
      data: {
        id: farmer._id,
        name: farmer.name,
        email: farmer.email,
      },
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
});

// Register new buyer
router.post("/register/buyer", async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;

    // Check if buyer exists
    const buyerExists = await Buyer.findOne({ email });
    if (buyerExists) {
      return res.status(400).json({
        success: false,
        error: "Buyer already exists with this email",
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create buyer
    const buyer = await Buyer.create({
      name,
      email,
      password: hashedPassword,
      phone,
    });

    res.status(201).json({
      success: true,
      data: {
        id: buyer._id,
        name: buyer.name,
        email: buyer.email,
      },
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
});

module.exports = router;
