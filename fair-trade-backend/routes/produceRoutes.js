const express = require("express");
const router = express.Router();
const Produce = require("../models/Produce");

// Add new produce
router.post("/", async (req, res) => {
  try {
    const produce = await Produce.create(req.body);
    res.status(201).json({
      success: true,
      data: produce,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
});

module.exports = router;
