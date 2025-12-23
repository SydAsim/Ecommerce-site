// src/infrastructure/persistence/schemas/Address.schema.js (Final)
import mongoose from "mongoose";

const addressSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
    label: { type: String, trim: true }, // e.g., "Home", "Office"
    recipientName: { type: String, required: true, trim: true },
    phone: { type: String, required: true },
    street1: { type: String, required: true },
    street2: { type: String, trim: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    postalCode: { type: String, required: true },
    country: { type: String, required: true, default: "Pakistan" },
    isDefault: { type: Boolean, default: false },
  },
  { timestamps: true }
);

// Compound index: fast lookup of default address per user
addressSchema.index({ user: 1, isDefault: 1 });
// Also useful for listing all addresses per user
addressSchema.index({ user: 1 });

export const Address = mongoose.model("Address", addressSchema);