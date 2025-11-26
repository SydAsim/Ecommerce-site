import mongoose, { Schema } from "mongoose";

const reviewSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: [true, "User is required"],
  },

  product: {
    type: Schema.Types.ObjectId,
    ref: "Product",
    required: [true, "Product is required"],
  },

  rating: {
    type: Number,
    required: [true, "Rating is required"],
    min: [1, "Rating must be at least 1"],
    max: [5, "Rating cannot exceed 5"],
  },

  comment: {
    type: String,
    trim: true,
  },
  
}, { timestamps: true });

// Prevent duplicate reviews
reviewSchema.index({ user: 1, product: 1 }, { unique: true });
// For fetching reviews fast
reviewSchema.index({ product: 1, rating: -1 });

export const Review = mongoose.model("Review", reviewSchema);