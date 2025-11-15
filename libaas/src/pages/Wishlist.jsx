// src/pages/Wishlist.jsx
import React, { useEffect, useState } from "react";
import api from "../axiosConfig";
import "./Wishlist.css";

export default function Wishlist() {
  const [wishlist, setWishlist] = useState([]);
  const token = localStorage.getItem("token");

  // LOAD WISHLIST
  useEffect(() => {
    if (!token) return;

    const loadWishlist = async () => {
      try {
        const res = await api.get("/api/user/wishlist", {
          headers: { "x-auth-token": token }
        });

        setWishlist(res.data.wishlist);
      } catch (err) {
        console.error("Wishlist Load Error:", err);
      }
    };

    loadWishlist();
  }, [token]);

  // REMOVE ITEM
  const removeItem = async (productId) => {
    try {
      await api.delete(`/api/user/wishlist/remove/${productId}`, {
        headers: { "x-auth-token": token }
      });

      setWishlist((prev) => prev.filter((item) => item._id !== productId));
    } catch (err) {
      console.error("Remove Failed:", err);
    }
  };

  // MOVE TO CART
  const moveToCart = async (item) => {
    try {
      // Add item to cart
      await api.post(
        "/api/user/cart/add",
        { productId: item._id },
        { headers: { "x-auth-token": token } }
      );

      // Remove from wishlist
      await removeItem(item._id);
    } catch (err) {
      console.error("Move to Cart Error:", err);
    }
  };

  return (
    <div className="wishlist-container">

      <h2>Your Wishlist ❤️</h2>

      <div className="wishlist-grid">
        {wishlist.length === 0 ? (
          <p className="empty-text">No items in wishlist.</p>
        ) : (
          wishlist.map((item) => (
            <div key={item._id} className="wishlist-card">
              <img src={item.image} alt="" />

              <h3>{item.name}</h3>
              <p>₹ {item.price}</p>

              <button className="move-btn" onClick={() => moveToCart(item)}>
                Move to Cart
              </button>

              <button
                className="remove-btn"
                onClick={() => removeItem(item._id)}
              >
                Remove
              </button>
            </div>
          ))
        )}
      </div>

    </div>
  );
}
