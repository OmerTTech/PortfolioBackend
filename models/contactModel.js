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
    type: mongoose.Schema.Types.Mixed,
  },
  MyGithub: {
    type: String,
  },
  MyLinkedin: {
    type: String,
  },
});

module.exports = mongoose.model("Contact", contactSchema);
