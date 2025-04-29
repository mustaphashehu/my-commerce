const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    username: { type: String },
    products: [
      {
        productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
        name: { type: String, required: true },
        paid: {
          type: Boolean,
          default: false
        },
        price: { type: Number, required: true },
        quantity: { type: Number, required: true, default: 1 },
        postalCode: { type: String },
        phoneNumber: { type: String },
        deliveryAddress: { type: String },
        paymentIntentId: {
          type: String
        }
      }
    ],
    totalPrice: { type: Number, default: 0 },
    postalCode: { type: String },
    phoneNumber: { type: String },
    deliveryAddress: { type: String },
    // paymentIntentId: {
    //   type: String
    // }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Cart", CartSchema);
