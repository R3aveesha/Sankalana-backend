const express = require("express");
const router = express.Router();
const path = require("path");
const multer = require("multer");
const {
  createSponsorship,
  getSponsorships,
  getSponsorshipById,
  updateSponsorship,
  deleteSponsorship,
} = require("../controllers/sponsorshipController");

// Multer storage config
const uploadDir = path.join(__dirname, "..", "uploads");
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const base = path.basename(file.originalname, ext).replace(/[^a-zA-Z0-9-_]/g, "_");
    cb(null, `${base}-${Date.now()}${ext}`);
  },
});

const upload = multer({ storage });

router.get("/", getSponsorships);
router.post("/", upload.single("image"), createSponsorship);
router.get("/:id", getSponsorshipById);
router.put("/:id", upload.single("image"), updateSponsorship);
router.delete("/:id", deleteSponsorship);

module.exports = router;
