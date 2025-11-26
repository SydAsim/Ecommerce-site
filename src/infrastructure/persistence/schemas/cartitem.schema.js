import mongoose, { Schema } from "mongoose";

const cartitemSchema = new Schema({
    cartid: {
        type: Schema.Types.ObjectId,
        ref: "Cart",
        required: [true, 'cart id is required'],
    },

    quantity: {
        type: Number,
        required: [true, "Quantity is required"],
        default: 0,
    },

    productid:
        [
            {
                type: Schema.Types.ObjectId,
                ref: "Product",
                required: [true, "product id is required"],

            }
        ]

}, { timestamps: true })

export const Cartitem = mongoose.model("Cartitem", cartitemSchema)