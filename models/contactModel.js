const mongoose = require("mongoose");

const contactSchema = mongoose.Schema({
  MyPhone: {
    type: String,
    required: true,
  },
  MyPhoneLink: {
    type: String,
    required: true,
  },
  MyEmail: {
    type: String,
    required: true,
  },
  MyEmailLink: {
    type: String,
    required: true,
  },
  MyLocation: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Contact", contactSchema);