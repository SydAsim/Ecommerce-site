import mongoose, { Schema } from "mongoose";

const productSchema = new Schema({
    name: {
        type: String,
        required: [true, "Product name is required"],
        trim: true,
        lowercase: true
    },

    description: {
        type: String,
        required: [true, "Description is required"],
    },

    price: {
        type: Number,
        required: [true, "Price is required"],
        trim: true
    },

    stockcount: {
        type: Number,
        required: [true, "stockcount is required"],
        trim: true
    },

    category: {
        type: Schema.Types.ObjectId,
        ref: "Categorie",
        trim: true,
        required: [true, "category id is required"],
    },

    image: {
        type: String,
        required: [true, "Image is required"],
    },

    // avg rating
    rating: {
        type: Number,
        default: 0
    },

    // number of reviews
    numreview: {
        type : Number,
        default : 0
    }

}, { timestamps: true })

export const Product = mongoose.model("Product", productSchema)