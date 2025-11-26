const wishlistModel = require("../models/WishlistModel");

const userModel = require("../models/UserModel");

// GET Wishlist (Token → extract user)
const getWishlist = async (req, res) => {
    try {
        const userId = req.user._id;
        const wishlist = await wishlistModel.find({ userId });

        const user = await userModel.findById(userId);

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }


        res.json({
            success: true,
            wishlist,
        });

    } catch (error) {
        console.log("Wishlist fetch error:", error);
        res.status(500).json({
            success: false,
            message: "Server error",
        });
    }
};



// ADD Wishlist Item
const addWishlistItem = async (req, res) => {
    try {
        const userId = req.user._id;
        const { productId, image } = req.body; // only productId sent from frontend

        if (!productId) {
            return res.status(400).json({ success: false, message: "Product ID missing" });
        }

        const user = await userModel.findById(userId);

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        // Prevent duplicates
        const exists = await wishlistModel.findOne({ userId, productId });
        if (exists) {
            return res.status(409).json({ success: false, message: "Already in wishlist" });
        }



        const newItem = new wishlistModel({
            userId,
            image,
            productId,
        });

        await newItem.save();

        res.status(201).json({
            success: true,
            message: "Added to wishlist",
            item: newItem,
        });

    } catch (error) {
        console.log("Wishlist add error:", error);
        res.status(500).json({
            success: false,
            message: "Server error",
        });
    }
};



// REMOVE Wishlist Item
const removeWishlistItem = async (req, res) => {
    try {
        const userId = req.user._id;
        const { productId } = req.body; // only productId sent from frontend



        if (!productId) {
            return res.status(400).json({ success: false, message: "Product ID missing" });
        }

        const user = await userModel.findById(userId);

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }


        const removed = await wishlistModel.findOneAndDelete({
            userId,
            productId,
        });

        if (!removed) {
            return res.status(404).json({
                success: false,
                message: "Item not found in wishlist",
            });
        }

        res.json({
            success: true,
            message: "Removed from wishlist",
        });

    } catch (error) {
        console.log("Wishlist remove error:", error);
        res.status(500).json({
            success: false,
            message: "Server error",
        });
    }
};



module.exports = {
    getWishlist,
    addWishlistItem,
    removeWishlistItem,
};
