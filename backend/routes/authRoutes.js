const express = require("express");

const router = express.Router();

const User = require("../models/User");

router.post("/login", async (req, res) => {

  try {

    const { department, password } = req.body;

    const user = await User.findOne({

      department,

      password

    });

    if (!user) {

      return res.status(401).json({

        success: false,

        message: "Invalid credentials"

      });

    }

    res.json({

      success: true,

      department: user.department

    });

  } catch (error) {

    res.status(500).json({

      success: false,

      message: "Server Error"

    });

  }

});

module.exports = router;