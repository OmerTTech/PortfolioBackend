const express = require("express");
const router = express.Router();

const Slide = require("../models/slidesModel.js");
const Contact = require("../models/contactModel.js");
const Portfolio = require("../models/portfolioModel.js");
const Qualf = require("../models/qualfModel.js");
const Message = require("../models/messageModel.js");

// SLIDES
router.get("/slides", async (req, res) => {
  const slides = await Slide.find();
  res.json(slides);
});

router.get("/slides/:lang", async (req, res) => {
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

router.post("/slides", async (req, res) => {
  const newSlide = await Slide.create(req.body);
  res.status(201).json(newSlide);
});

router.put("/slides/:id", async (req, res) => {
  const updatedSlide = await Slide.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(updatedSlide);
});

router.delete("/slides/:id", async (req, res) => {
  await Slide.findByIdAndDelete(req.params.id);
  res.status(200).json({ message: "Slayt başarıyla silindi." });
});

// CONTACT
router.get("/contacts", async (req, res) => {
  const contacts = await Contact.find();
  res.json(contacts);
});

router.get("/contacts/:lang", async (req, res) => {
  const { lang } = req.params;
  const contacts = await Contact.find();
  const filteredContacts = contacts.map((contact) => ({
    _id: contact._id,
    MyPhone: contact.MyPhone,
    MyPhoneLink: contact.MyPhoneLink,
    MyEmail: contact.MyEmail,
    MyEmailLink: contact.MyEmailLink,
    MyLocation: contact.MyLocation[lang],
    MyGithub: contact.MyGithub,
    MyLinkedin: contact.MyLinkedin,
  }));
  res.json(filteredContacts);
});

router.post("/contacts", async (req, res) => {
  const newContact = await Contact.create(req.body);
  res.status(201).json(newContact);
});

router.put("/contacts/:id", async (req, res) => {
  const updatedContact = await Contact.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(updatedContact);
});

router.delete("/contacts/:id", async (req, res) => {
  await Contact.findByIdAndDelete(req.params.id);
  res.status(200).json({ message: "İletişim başarıyla silindi." });
});

// PORTFOLIO
router.get("/portfolios", async (req, res) => {
  const portfolios = await Portfolio.find();
  res.json(portfolios);
});

router.get("/portfolios/:lang", async (req, res) => {
  const { lang } = req.params;
  const portfolios = await Portfolio.find();
  const filteredPortfolios = portfolios.map((portfolio) => ({
    _id: portfolio._id,
    title: portfolio.title[lang],
    text: portfolio.text[lang],
    image: portfolio.image,
    demoLink: portfolio.demoLink,
    tools: portfolio.tools || [],
  }));
  res.json(filteredPortfolios);
});

router.post("/portfolios", async (req, res) => {
  const newPortfolio = await Portfolio.create(req.body);
  res.status(201).json(newPortfolio);
});

router.put("/portfolios/:id", async (req, res) => {
  const updatedPortfolio = await Portfolio.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(updatedPortfolio);
});

router.delete("/portfolios/:id", async (req, res) => {
  await Portfolio.findByIdAndDelete(req.params.id);
  res.status(200).json({ message: "Proje başarıyla silindi." });
});

// QUALFS
router.get("/qualfs", async (req, res) => {
  const qualfs = await Qualf.find();
  res.json(qualfs);
});

router.get("/qualfs/:lang", async (req, res) => {
  const { lang } = req.params;
  const qualfs = await Qualf.find();
  const filteredQualfs = qualfs.map((qualf) => ({
    _id: qualf._id,
    title: qualf.title[lang],
    company: qualf.company[lang],
    years: qualf.years,
    category: qualf.category,
  }));
  res.json(filteredQualfs);
});

router.get("/qualfs/:category/:lang", async (req, res) => {
  const { category, lang } = req.params;
  try {
    const qualfs = await Qualf.find({ category: category });
    if (qualfs.length === 0) {
      return res
        .status(404)
        .json({ message: "Bu kategoriye ait veri bulunamadı." });
    }
    const filteredQualfs = qualfs.map((qualf) => ({
      _id: qualf._id,
      title: qualf.title[lang],
      company: qualf.company[lang],
      years: qualf.years,
      category: qualf.category,
    }));
    res.json(filteredQualfs);
  } catch (error) {
    res.status(500).json({ message: "Sunucu hatası", error: error.message });
  }
});

router.post("/qualfs", async (req, res) => {
  const newQualf = await Qualf.create(req.body);
  res.status(201).json(newQualf);
});

router.put("/qualfs/:id", async (req, res) => {
  const updatedQualf = await Qualf.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(updatedQualf);
});

router.delete("/qualfs/:id", async (req, res) => {
  await Qualf.findByIdAndDelete(req.params.id);
  res.status(200).json({ message: "Nitelik başarıyla silindi." });
});

// MESSAGES
router.post("/messages", async (req, res) => {
  try {
    const newMessage = await Message.create(req.body);
    res.status(201).json(newMessage);
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Mesaj gönderilirken bir hata oluştu.",
        error: error.message,
      });
  }
});

router.get("/messages", async (req, res) => {
  const messages = await Message.find();
  res.json(messages);
});

router.delete("/messages/:id", async (req, res) => {
  await Message.findByIdAndDelete(req.params.id);
  res.status(200).json({ message: "Mesaj başarıyla silindi." });
});

module.exports = router;
