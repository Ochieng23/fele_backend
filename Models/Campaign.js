const mongoose = require("mongoose");

const CampaignSchema = new mongoose.Schema(
  {
    campaignName: { type: String, required: true },
    contentDescription: { type: String },
    adFormat: { type: String, required: true },
    targetAudience: { type: String },
    region: { type: String, required: true },
    specificLocation: { type: String },
    budget: { type: String },
    installments: { type: String },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    timeSlots: [{ type: String }],
    // The buyer who created this campaign
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    // List of vendor IDs associated with this campaign
    vendorIds: [{ type: mongoose.Schema.Types.ObjectId, ref: "Vendor" }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Campaign", CampaignSchema);
