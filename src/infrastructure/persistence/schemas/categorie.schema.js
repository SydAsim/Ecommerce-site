import mongoose, { Schema } from "mongoose";

const categorySchema = new Schema({
  name: {
    type: String,
    required: [true, "Category name is required"],
    trim: true,
    unique: true,
  },

  description: {
    type: String,
    trim: true,
  },

  image: {
    type: String,
    required: [true, "Category image is required"],
  },

  parent: {
    type: Schema.Types.ObjectId,
    ref: "Category",
    default: null,
  },

}, { timestamps: true });

categorySchema.index({ name: 1 });
categorySchema.index({ parent: 1 });

export const Category = mongoose.model("Category", categorySchema);

// parent category is it self meaning if 
// _id    name             parent,   →     What user sees in frontend
// 1,     Electronics,      null             Electronics (top level)
// 2,     Mobile Phones      ,1,             Electronics → Mobile Phones
// 3,     iPhone,            2,              Electronics → Mobile Phones → iPhone
// 4,     Samsung,            2,             Electronics → Mobile Phones → Samsung
// 5,     Clothing            ,null,         Clothing (top level)
// 6,     Men,            5,                 Clothing → Men
// 7,     Shirts,            6,              Clothing → Men → Shirts