const mongoose = require("mongoose");

const sponsorshipSchema = new mongoose.Schema(
  {
    sponsorName: { type: String, required: true, trim: true },
    imageUrl: { type: String, trim: true },
    price: { type: Number, required: true, min: 0 },
    description: { type: String, trim: true },
    website: { type: String, trim: true },
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Sponsorship", sponsorshipSchema);
