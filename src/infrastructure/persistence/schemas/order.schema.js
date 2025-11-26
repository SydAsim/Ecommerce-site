import mongoose, { Schema } from "mongoose";


// Once the customer clicks "Place Order" → the price is LOCKED FOREVER.
// You cannot and must not change it later — even if the product price drops to $1.

// Order  → snapshot    → frozen forever

const orderItemSchema = new Schema({
  product: {
    type: Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },

  name: String,     // snapshot copy the current name, price, image into the order
  price: Number,    // snapshot So the order is 100% correct forever, no matter what happens to the product later.

  quantity: {
    type: Number,
    required: true,
    min: 1,
  },

  image: String,
});



const orderSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  items: [orderItemSchema],

  shippingAddress: {
    type: String,
    required: true,
  },

  paymentMethod: {
    type: String,
    required: true,
  },

  paymentResult: {
    type: Object,
    default: null,
  },
  
  coupon: {
    type: Schema.Types.ObjectId,
    ref: "Coupon",
    default: null,
  },

  totalPrice: {
    type: Number,
    required: true,
    min: 0,
  },

  isPaid: {
    type: Boolean,
    default: false,
  },

  paidAt: Date,
  
  isDelivered: {
    type: Boolean,
    default: false,
  },

  deliveredAt: Date,

  status: {
    type: String,
    enum: ["pending", "confirmed", "shipped", "delivered", "cancelled"],
    default: "pending",
  },

}, { timestamps: true });

orderSchema.index({ user: 1, createdAt: -1 });
orderSchema.index({ status: 1 });

export const Order = mongoose.model("Order", orderSchema);


// ──────────────────────────────────────────────────────────────
//                  ORDER HISTORY WITH & WITHOUT SNAPSHOT
// ──────────────────────────────────────────────────────────────

//              |          WITHOUT SNAPSHOT         |        WITH SNAPSHOT
// ─────────────┼────────────────────────────────────┼──────────────────────────────────

// DAY 1        |  Product: iPhone 15 - $999         |  Product: iPhone 15 - $999
// (User buys)  |  (Saved as reference to product)   |  (Saved as stored snapshot)
// ─────────────┼────────────────────────────────────┼──────────────────────────────────

// DAY 30       |  Product changed in DB:            |  Product changed in DB:
// (Admin       |  • Renamed → "iPhone 15 (2023)"    |  • Renamed → "iPhone 15 (2023)"
//  changes)    |  • Price dropped → $899            |  • Price dropped → $899
//              |                                    |
//              |  Order now shows updated data →    |  Order still shows original:
//              |  "iPhone 15 (2023)" - $899         |  "iPhone 15" - $999
// ─────────────┼────────────────────────────────────┼──────────────────────────────────

// DAY 60       |  Product deleted / unavailable     |  Product deleted / unavailable
// (Product     |                                    |
//  removed)    |  Order shows: “Product not found”  |  Order still shows:
//              |  (Broken order history)            |  iPhone 15 - $999
//              |                                    |  (Snapshot preserved)
// ──────────────────────────────────────────────────────────────────────────────
