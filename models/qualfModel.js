const mongoose = require("mongoose");

const qualfSchema = mongoose.Schema({
  title: {
    az: { type: String, required: true },
    en: { type: String, required: true },
  },
  company: {
    az: { type: String, required: true },
    en: { type: String, required: true },
  },
  years: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Qualf", qualfSchema);