const express = require("express");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const db = require("./config/database.js");
const dotenv = require("dotenv").config();
const adminRoutes = require("./routes/adminRoutes.js");
const Slide = require("./models/slidesModel.js");
const Portfolio = require("./models/portfolioModel.js");
const Qualf = require("./models/qualfModel.js");
const Contact = require("./models/contactModel.js");
const { authMiddleware, generateToken, comparePassword } = require("./middleware/authMiddleware.js");

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));

const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: { success: false, message: "Too many requests, please try again later." }
});

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  skipSuccessfulRequests: true,
  message: { success: false, message: "Too many login attempts, please try again later." }
});

app.use(generalLimiter);

app.use("/api/admin", authMiddleware, adminRoutes);

app.post("/api/login", loginLimiter, async (req, res) => {
  const { username, password } = req.body;
  
  const ADMIN_USER = process.env.ADMIN_USER || "admin";
  const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

  if (!username || !password) {
    return res.status(400).json({ success: false, message: "Username and password required" });
  }

  if (username !== ADMIN_USER) {
    return res.status(401).json({ success: false, message: "Invalid credentials" });
  }

  const isValidPassword = password === ADMIN_PASSWORD;
  
  if (!isValidPassword) {
    return res.status(401).json({ success: false, message: "Invalid credentials" });
  }

  const token = generateToken({ username: ADMIN_USER });
  
  res.json({ 
    success: true, 
    token,
    username: ADMIN_USER
  });
});

app.post("/api/verify-token", authMiddleware, (req, res) => {
  res.json({ success: true, valid: true, admin: req.admin });
});

app.post("/api/refresh-token", authMiddleware, (req, res) => {
  const newToken = generateToken(req.admin);
  res.json({ success: true, token: newToken });
});

app.post("/api/logout", (req, res) => {
  res.json({ success: true, message: "Logged out successfully" });
});

app.get("/api/admin-check", (req, res) => {
  res.json({ message: "Admin API is running" });
});

app.get("/api/slides", async (req, res) => {
  try {
    const slides = await Slide.find();
    res.json(slides);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

app.get("/api/portfolios", async (req, res) => {
  try {
    const portfolios = await Portfolio.find();
    res.json(portfolios);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

app.get("/api/qualfs", async (req, res) => {
  try {
    const qualfs = await Qualf.find();
    res.json(qualf);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

app.get("/api/qualfs/:category", async (req, res) => {
  try {
    const qualfs = await Qualf.find({ category: req.params.category });
    res.json(qualf);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

app.get("/api/contacts", async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

const PORT = process.env.PORT || 5000;

db();

app.listen(PORT, () => console.log("Server is running on port: " + PORT));

app.get("/", (req, res) => {
  res.send("API çalışıyor!");
});
