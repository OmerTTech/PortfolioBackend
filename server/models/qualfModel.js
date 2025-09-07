const mongoose = require("mongoose");

const qualfSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  company: {
    type: String,
    required: true,
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
