const express = require("express");

const router = express.Router();

const Delay = require("../models/Delay");

// GET ALL DELAYS

router.get("/", async (req, res) => {

  try {

    const delays = await Delay.find();

    res.json(delays);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

});

// ADD DELAY ENTRY

router.post("/", async (req, res) => {

  try {

    const delay = await Delay.create(req.body);

    res.status(201).json(delay);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

});

module.exports = router;