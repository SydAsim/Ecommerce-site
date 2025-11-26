import mongoose, { Schema } from "mongoose";

const couponSchema = new Schema({
  code: {
    type: String,
    required: true,
    unique: true,
    uppercase: true,
    trim: true,
  },

  discountType: {
    type: String,
    enum: ["percentage", "fixed"],
    default: "percentage",
  },


  discountValue: {
    type: Number,
    required: true,
    min: 0,
  },


  minAmount: {
    type: Number,
    default: 0,
  },

  maxUses: {
    type: Number,
    default: null,
  },


  usedCount: {
    type: Number,
    default: 0,
  },


  expiresAt: {
    type: Date,
    required: true,
  },
  

  isActive: {
    type: Boolean,
    default: true,
  },


}, { timestamps: true });

couponSchema.index({ code: 1 });
couponSchema.index({ expiresAt: 1 });

export const Coupon = mongoose.model("Coupon", couponSchema);