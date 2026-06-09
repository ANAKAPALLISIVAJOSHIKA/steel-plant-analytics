const fs = require("fs");
const csv = require("csv-parser");
const mongoose = require("mongoose");
require("dotenv").config();

const Delay = require("./models/Delay");

mongoose.connect(process.env.MONGO_URI);

const results = [];

fs.createReadStream("../processed_delays.csv")
  .pipe(csv())

  .on("data", (data) => {

    results.push({

      date: data.DEL_DATE || "",

      department: data.SHOP_CODE || "",

      delayType: data.EQPT || "",

      delayDescription: data.REMARKS || "",

      duration: Number(data.TOTAL_MINUTES) || 0,

      agency: data.AGENCY_CODE || "",

      shift: data.SUB_EQPT || ""

    });

  })

  .on("end", async () => {

    try {

      await Delay.deleteMany();

      await Delay.insertMany(results);

      console.log("CSV Imported Successfully");

      mongoose.connection.close();

    } catch (error) {

      console.log(error);

    }

  });
