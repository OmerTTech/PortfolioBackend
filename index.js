const express = require("express");
const cors = require("cors");
const db = require("./config/dataBase");
const dotenv = require("dotenv").config();
const adminRoutes = require("./routes/adminRoutes");

const app = express();

app.use(cors());
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));

app.use("/", adminRoutes);

const PORT = process.env.PORT || 5000;

db();

app.listen(PORT, () => console.log("Server is running on port: " + PORT));

app.get("/", (req, res) => {
  res.send("API çalışıyor!");
});
