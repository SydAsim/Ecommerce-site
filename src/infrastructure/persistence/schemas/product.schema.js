import mongoose, { Schema } from "mongoose";

const productSchema = new Schema({
  name: {
    type: String,
    required: [true, "Product name is required"],
    trim: true,
  },

  description: {
    type: String,
    required: [true, "Description is required"],
  },

  price: {
    type: Number,
    required: [true, "Price is required"],
    min: [0, "Price cannot be negative"],
  },

  stock: {
    type: Number,
    required: [true, "Stock is required"],
    min: [0, "Stock cannot be negative"],
  },

  category: {
    type: Schema.Types.ObjectId,
    ref: "Category", 
    required: [true, "Category is required"],
  },

  images: {
    type: [String], // ← array for multiple images
    required: [true, "At least one image is required"],
  },


  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5,
  },


  numReviews: {
    type: Number,
    default: 0,
  },


  isActive: {
    type: Boolean,
    default: true,
  },

  
}, { timestamps: true });

// Critical indexes
productSchema.index({ category: 1 });
productSchema.index({ price: 1 });
productSchema.index({ name: "text", description: "text" }); // full-text search
productSchema.index({ isActive: 1 });

export const Product = mongoose.model("Product", productSchema);