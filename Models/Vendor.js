const mongoose = require("mongoose");

const VendorSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    price: { type: String, required: true },
    // Now an array of locations instead of a single location string
    locations: [{ type: String }],
    phone: { type: String },
    features: [{ type: String }],
    image: { type: String },
    // The vendor's owner (User with role "vendor")
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

// Prevent overwriting model if already compiled (useful in development)
module.exports = mongoose.models.Vendor || mongoose.model("Vendor", VendorSchema);
