const express = require("express");
const router = express.Router();

// Modelleri içeri aktar
const Slide = require("../models/slidesModel.js");
const Contact = require("../models/contactModel.js");
const Portfolio = require("../models/portfolioModel.js");
const Qualf = require("../models/qualfModel.js");
const Message = require("../models/messageModel.js");

// SLIDES (SLAYTLAR)
// DİLE GÖRE tüm slaytları getir (READ)
router.get("/slides/:lang", async (req, res) => {
  const { lang } = req.params;
  const slides = await Slide.find();

  const filteredSlides = slides.map((slide) => ({
    _id: slide._id,
    title: slide.title[lang],
    text: slide.text[lang],
  }));
  res.json(filteredSlides);
});

// Yeni slayt oluştur (CREATE)
router.post("/slides", async (req, res) => {
  const newSlide = await Slide.create(req.body);
  res.status(201).json(newSlide);
});

// Belirli bir slaytı güncelle (UPDATE)
router.put("/slides/:id", async (req, res) => {
  const updatedSlide = await Slide.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(updatedSlide);
});

// Belirli bir slaytı sil (DELETE)
router.delete("/slides/:id", async (req, res) => {
  await Slide.findByIdAndDelete(req.params.id);
  res.status(200).json({ message: "Slayt başarıyla silindi." });
});

// --- CONTACT (İLETİŞİM) ---
// Not: Contact modeli iki dilli olmadığı için eski haliyle kalıyor.
// İletişim verilerini getir (READ)
router.get("/contacts", async (req, res) => {
  const contacts = await Contact.find();
  res.json(contacts);
});

// İletişim verilerini güncelle (UPDATE)
router.put("/contacts/:id", async (req, res) => {
  const updatedContact = await Contact.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );
  res.json(updatedContact);
});

// --- PORTFOLIO (PROJELER) ---
// DİLE GÖRE tüm portfolyo projelerini getir (READ)
router.get("/portfolios/:lang", async (req, res) => {
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

// Yeni portfolyo projesi oluştur (CREATE)
router.post("/portfolios", async (req, res) => {
  const newPortfolio = await Portfolio.create(req.body);
  res.status(201).json(newPortfolio);
});

// Portfolyo projesi güncelle (UPDATE)
router.put("/portfolios/:id", async (req, res) => {
  const updatedPortfolio = await Portfolio.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );
  res.json(updatedPortfolio);
});

// Portfolyo projesi sil (DELETE)
router.delete("/portfolios/:id", async (req, res) => {
  await Portfolio.findByIdAndDelete(req.params.id);
  res.status(200).json({ message: "Proje başarıyla silindi." });
});

// --- QUALF (NİTELİKLER) ---
// DİLE GÖRE tüm nitelikleri getir (READ)
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

// DİLE GÖRE belirli bir kategoriye göre nitelikleri getir (READ by category)
// Örnek: GET /api/admin/qualfs/education/az
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

// Yeni nitelik oluştur (CREATE)
router.post("/qualfs", async (req, res) => {
  const newQualf = await Qualf.create(req.body);
  res.status(201).json(newQualf);
});

// Nitelik güncelle (UPDATE)
router.put("/qualfs/:id", async (req, res) => {
  const updatedQualf = await Qualf.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(updatedQualf);
});

// Nitelik sil (DELETE)
router.delete("/qualfs/:id", async (req, res) => {
  await Qualf.findByIdAndDelete(req.params.id);
  res.status(200).json({ message: "Nitelik başarıyla silindi." });
});

// Yeni bir mesaj oluştur (CREATE)
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

// Tüm mesajları getir (READ)
router.get("/messages", async (req, res) => {
  const messages = await Message.find();
  res.json(messages);
});

// Belirli bir mesajı sil (DELETE)
router.delete("/messages/:id", async (req, res) => {
  await Message.findByIdAndDelete(req.params.id);
  res.status(200).json({ message: "Mesaj başarıyla silindi." });
});

module.exports = router;
