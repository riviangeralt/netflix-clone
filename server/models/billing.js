const mongoose = require("mongoose");

const billingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    plan: {
      type: String,
      enum: ["free", "standard", "premium"],
      default: "free",
    },
    nextBilling: {
      type: Date,
      default: Date.now + 30 * 24 * 60 * 60 * 1000,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Billing", billingSchema);
