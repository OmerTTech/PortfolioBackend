const mongoose = require("mongoose");

const db = () => {
  mongoose
    .connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("mongoDB Database Connected!");
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = db;
