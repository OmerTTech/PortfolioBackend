const express = require("express");
const cors = require("cors");
const db = require("./config/database.js");
const dotenv = require("dotenv").config();
const adminRoutes = require("./routes/adminRoutes.js");
const Slide = require("./models/slidesModel.js");
const Portfolio = require("./models/portfolioModel.js");
const Qualf = require("./models/qualfModel.js");
const Contact = require("./models/contactModel.js");

const app = express();

app.use(cors());
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));

app.use("/api/admin", adminRoutes);

// Public API routes for frontend
app.get("/slides/:lang", async (req, res) => {
  const { lang } = req.params;
  const slides = await Slide.find();
  const filteredSlides = slides.map((slide) => ({
    _id: slide._id,
    title: slide.title[lang],
    text: slide.text[lang],
    image: slide.image,
  }));
  res.json(filteredSlides);
});

app.get("/portfolios/:lang", async (req, res) => {
  const { lang } = req.params;
  const portfolios = await Portfolio.find();
  const filteredPortfolios = portfolios.map((portfolio) => ({
    _id: portfolio._id,
    title: portfolio.title[lang],
    text: portfolio.text[lang],
    image: portfolio.image,
    demoLink: portfolio.demoLink,
  }));
  res.json(filteredPortfolios);
});

app.get("/qualfs/:category/:lang", async (req, res) => {
  const { category, lang } = req.params;
  const qualfs = await Qualf.find({ category: category });
  const filteredQualfs = qualfs.map((qualf) => ({
    _id: qualf._id,
    title: qualf.title[lang],
    company: qualf.company[lang],
    years: qualf.years,
    category: qualf.category,
  }));
  res.json(filteredQualfs);
});

app.get("/contacts", async (req, res) => {
  const { lang } = req.query;
  const contacts = await Contact.find();
  if (lang) {
    const filteredContacts = contacts.map((contact) => ({
      _id: contact._id,
      MyPhone: contact.MyPhone,
      MyPhoneLink: contact.MyPhoneLink,
      MyEmail: contact.MyEmail,
      MyEmailLink: contact.MyEmailLink,
      MyLocation: typeof contact.MyLocation === 'object' ? contact.MyLocation[lang] : contact.MyLocation,
      MyGithub: contact.MyGithub,
      MyLinkedin: contact.MyLinkedin,
    }));
    res.json(filteredContacts);
  } else {
    res.json(contacts);
  }
});

app.post("/messages", async (req, res) => {
  const Message = require("./models/messageModel.js");
  const newMessage = await Message.create(req.body);
  res.status(201).json(newMessage);
});

app.post("/api/login", (req, res) => {
  const { username, password } = req.body;
  if (username === "admin" && password === "omer123") {
    res.json({ success: true, token: "admin-token-omer" });
  } else {
    res.status(401).json({ success: false, message: "Invalid credentials" });
  }
});

app.post("/api/seed", async (req, res) => {
  try {
    await Slide.deleteMany({});
    await Portfolio.deleteMany({});
    await Qualf.deleteMany({});
    await Contact.deleteMany({});

    await Slide.create([
      {
        title: { az: "Xoş Gəlmisiniz", en: "Welcome" },
        text: { az: "Mən Omer Tərxan - Full Stack Developer", en: "I am Omer Tarkhan - Full Stack Developer" },
        image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800"
      },
      {
        title: { az: "Proqramlaşdırma", en: "Programming" },
        text: { az: "Web proqramlaşdırma və mobile app inkişafı", en: "Web programming and mobile app development" },
        image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800"
      }
    ]);

    await Portfolio.create([
      {
        title: { az: "E-ticarət Saytı", en: "E-commerce Website" },
        text: { az: "React və Node.js ilə hazırlanmış online satış platforması", en: "Online sales platform built with React and Node.js" },
        demoLink: "https://demo.com",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800"
      },
      {
        title: { az: "Portfolio Vebsaytı", en: "Portfolio Website" },
        text: { az: "Şəxsi portfolio vebsaytım", en: "My personal portfolio website" },
        demoLink: "https://omertech.com",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800"
      }
    ]);

    await Qualf.create([
      {
        title: { az: "Kompüter Mühəndisliyi", en: "Computer Engineering" },
        company: { az: "Azərbaycan Dövlət Universiteti", en: "Azerbaijan State University" },
        years: "2020-2024",
        category: "education"
      },
      {
        title: { az: "Full Stack Developer", en: "Full Stack Developer" },
        company: { az: "Tech Company", en: "Tech Company" },
        years: "2024-h.h",
        category: "work"
      }
    ]);

    await Contact.create({
      MyPhone: "+994 50 123 45 67",
      MyPhoneLink: "https://wa.me/994501234567",
      MyEmail: "omer@example.com",
      MyEmailLink: "mailto:omer@example.com",
      MyLocation: { az: "Bakı, Azərbaycan", en: "Baku, Azerbaijan" },
      MyGithub: "https://github.com/omertarkhan",
      MyLinkedin: "https://linkedin.com/in/omertarkhan"
    });

    res.json({ message: "Test məlumatları əlavə edildi!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 5000;

db();

app.listen(PORT, () => console.log("Server is running on port: " + PORT));

app.get("/", (req, res) => {
  res.send("API çalışıyor!");
});
