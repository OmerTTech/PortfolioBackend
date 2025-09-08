const mongoose = require("mongoose");

const portfolioSchema = mongoose.Schema({
  title: {
    az: { type: String, required: true },
    en: { type: String, required: true },
  },
  text: {
    az: { type: String, required: true },
    en: { type: String, required: true },
  },
  demoLink: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Portfolio", portfolioSchema);