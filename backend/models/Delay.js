const mongoose = require("mongoose");

const delaySchema = new mongoose.Schema({
  date: {
    type: String,
  },

  department: {
    type: String,
  },

  delayType: {
    type: String,
  },

  delayDescription: {
    type: String,
  },

  duration: {
    type: Number,
  },

  agency: {
    type: String,
  },

  shift: {
    type: String,
  },
});

module.exports = mongoose.model("Delay", delaySchema);