const express = require("express");
const router = express.Router();

// Modelleri içeri aktar
const Slide = require("../models/slidesModel.js");
const Contact = require("../models/contactModel.js");
const Portfolio = require("../models/portfolioModel.js");
const Qualf = require("../models/qualfModel.js");

// SLIDES (SLAYTLAR)
// Tüm slaytları getir (READ)
router.get("/slides", async (req, res) => {
  const slides = await Slide.find();
  res.json(slides);
});

// Yeni slayt oluştur (CREATE)
router.post("/slides", async (req, res) => {
  const { title, text } = req.body;
  const newSlide = await Slide.create({
    title,
    text,
  });
  res.status(201).json(newSlide);
});

// Belirli bir slaytı güncelle (UPDATE)
router.put("/slides/:id", async (req, res) => {
  const updatedSlide = await Slide.findByIdAndUpdate(req.params.id, req.body, {
    new: true, // Güncellenmiş belgeyi döndürür
  });
  res.json(updatedSlide);
});

// Belirli bir slaytı sil (DELETE)
router.delete("/slides/:id", async (req, res) => {
  await Slide.findByIdAndDelete(req.params.id);
  res.status(200).json({ message: "Slayt başarıyla silindi." });
});

// CONTACT (İLETİŞİM)
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

// PORTFOLIO (PROJELER)
// Tüm portfolyo projelerini getir (READ)
router.get("/portfolios", async (req, res) => {
  const portfolios = await Portfolio.find();
  res.json(portfolios);
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

// QUALF (NİTELİKLER)
// Tüm nitelikleri getir (READ)
router.get("/qualfs", async (req, res) => {
  const qualfs = await Qualf.find();
  res.json(qualfs);
});

// Belirli bir kategoriye göre nitelikleri getir (READ by category)
// Örnek: GET /api/admin/qualfs/workExperience
// veya GET /api/admin/qualfs/education
router.get("/qualfs/:category", async (req, res) => {
  const { category } = req.params;
  try {
    const filteredQualfs = await Qualf.find({ category: category });
    if (filteredQualfs.length === 0) {
      return res
        .status(404)
        .json({ message: "Bu kategoriye ait veri bulunamadı." });
    }
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

module.exports = router;
