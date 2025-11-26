const mongoose = require("mongoose");

const CartItemSchema = new mongoose.Schema(
    {
        productId: {
            type: String,     // not ObjectId
            required: true,
        },
        quantity: {
            type: Number,
            required: true,
            default: 1,
            min: 1,
        },
    },
    { _id: false }
);

const CartSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            unique: true, // one cart per user
        },

        items: {
            type: [CartItemSchema],
            default: [],
        },

        totalQuantity: {
            type: Number,
            default: 0,
        },

        totalPrice: {
            type: Number,
            default: 0,
        },
    },
    { timestamps: true }
);

const CartModel = mongoose.model("Cart", CartSchema);

module.exports = CartModel;
