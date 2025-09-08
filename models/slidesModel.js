const mongoose = require("mongoose");

const slideSchema = mongoose.Schema(
  {
    title: {
      az: { type: String, required: true },
      en: { type: String, required: true },
    },
    text: {
      az: { type: String, required: true },
      en: { type: String, required: true },
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Slide", slideSchema);