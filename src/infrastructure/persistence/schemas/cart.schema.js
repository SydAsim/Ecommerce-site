import mongoose, { Schema } from "mongoose";
// Cart   → live price  → can change anytime
const cartSchema = new Schema({
    
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true, // one cart per user
  },

  //Cart items 
  items: [
    {
    product: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },

    quantity: {
      type: Number,
      required: true,
      min: 1,
      default: 1,
    },
  }

],


  coupon: {
    type: Schema.Types.ObjectId,
    ref: "Coupon",
    default: null,
  },

}, { timestamps: true });

cartSchema.index({ user: 1 });

export const Cart = mongoose.model("Cart", cartSchema);