// src/pages/Wishlist.jsx
import React, { useEffect, useState } from "react";
import api from "../axiosConfig";
import "./Wishlist.css";

export default function Wishlist() {
  const [wishlist, setWishlist] = useState([]);
  const token = localStorage.getItem("token");

  // -------- Load Wishlist --------
  useEffect(() => {
    if (!token) return;

    const loadWishlist = async () => {
      try {
        const response = await api.get("/api/user/wishlist", {
          headers: { "x-auth-token": token },
        });
        setWishlist(response.data.wishlist);
      } catch (err) {
        console.error("Wishlist Load Error:", err);
      }
    };

    // loadWishlist();
  }, [token]);

  // -------- Remove Item --------
  const removeItem = async (productId) => {
    // try {
    //   await api.delete(`/api/user/wishlist/remove/${productId}`, {
    //     headers: { "x-auth-token": token },
    //   });
    //   setWishlist((prev) =>
    //     prev.filter((item) => item.product._id !== productId)
    //   );
    // } catch (err) {
    //   console.error("Remove Failed:", err);
    // }
  };

  // -------- Move to Cart --------
  const moveToCart = async (item) => {
    // try {
    //   await api.post(
    //     "/api/user/cart/add",
    //     { productId: item.product._id },
    //     { headers: { "x-auth-token": token } }
    //   );
    //   removeItem(item.product._id);
    //   alert("Moved to Cart!");
    // } catch (err) {
    //   console.error("Move to Cart Error:", err);
    // }
  };

  return (
    <div className="wishlist-container">
      <h2>Your Wishlist ❤️</h2>
      <div className="wishlist-grid">
        {wishlist.length === 0 ? (
          <p className="empty-text">No items in wishlist.</p>
        ) : (
          wishlist.map((item) => (
            <div key={item.product._id} className="wishlist-card">
              <img src={item.product.image} alt={item.product.name} />
              <h3>{item.product.name}</h3>
              <p>₹ {item.product.price}</p>

              <button
                className="move-btn"
                onClick={() => moveToCart(item)}
              >
                Move to Cart
              </button>

              <button
                className="remove-btn"
                onClick={() => removeItem(item.product._id)}
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
