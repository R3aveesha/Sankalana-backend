const Sponsorship = require("../models/Sponsorship");

exports.createSponsorship = async (req, res) => {
  try {
    const { sponsorName, price, description, website, active, sponsorType } = req.body;
    const file = req.file;
    if (!sponsorName || price === undefined) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    const imageUrl = file ? `/uploads/${file.filename}` : null;
    const doc = await Sponsorship.create({ sponsorName, imageUrl, price, description, website, active, sponsorType });
    res.status(201).json(doc);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getSponsorships = async (req, res) => {
  try {
    const docs = await Sponsorship.find().sort({ createdAt: -1 });
    res.json(docs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getSponsorshipById = async (req, res) => {
  try {
    const doc = await Sponsorship.findById(req.params.id);
    if (!doc) return res.status(404).json({ message: "Not found" });
    res.json(doc);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateSponsorship = async (req, res) => {
  try {
    const updates = { ...req.body };
    if (req.file) {
      updates.imageUrl = `/uploads/${req.file.filename}`;
    }
    const doc = await Sponsorship.findByIdAndUpdate(req.params.id, updates, { new: true, runValidators: true });
    if (!doc) return res.status(404).json({ message: "Not found" });
    res.json(doc);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteSponsorship = async (req, res) => {
  try {
    const doc = await Sponsorship.findByIdAndDelete(req.params.id);
    if (!doc) return res.status(404).json({ message: "Not found" });
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
