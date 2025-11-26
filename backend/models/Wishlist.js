const mongoose = require("mongoose");

const WishlistSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true,
    },
    productId: {
        type: String,   // <-- your custom product ID / slug / SKU
        required: true,
    },
    image: {
        type: String,   // <-- your custom product ID / slug / SKU
        required: true,
    },
    addedAt: {
        type: Date,
        default: Date.now,
    },
});

const wishlistModel = mongoose.model("wishlists", WishlistSchema);

module.exports = wishlistModel;
