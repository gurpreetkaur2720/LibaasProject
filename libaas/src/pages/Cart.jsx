// src/pages/Cart.jsx
import React, { useEffect, useState } from "react";
import api from "../axiosConfig";
import "./Cart.css";

export default function Cart() {
  const [cart, setCart] = useState([]);
  const token = localStorage.getItem("token");

  // LOAD CART
  useEffect(() => {
    if (!token) return;

    const loadCart = async () => {
      try {
        const res = await api.get("/api/user/cart", {
          headers: { "x-auth-token": token },
        });

        setCart(res.data.cart);
      } catch (err) {
        console.error("Cart Load Error:", err);
      }
    };

    loadCart();
  }, [token]);

  // REMOVE ITEM
  const removeItem = async (productId) => {
    try {
      await api.delete(`/api/user/cart/remove/${productId}`, {
        headers: { "x-auth-token": token },
      });

      setCart((prev) => prev.filter((item) => item._id !== productId));
    } catch (err) {
      console.error("Remove Cart Error:", err);
    }
  };

  return (
    <div className="cart-container">
      <h2>Your Cart 🛒</h2>

      <div className="cart-grid">
        {cart.length === 0 ? (
          <p className="empty-text">No items in cart.</p>
        ) : (
          cart.map((item) => (
            <div key={item._id} className="cart-card">
              <img src={item.image} alt="" />

              <h3>{item.name}</h3>
              <p>₹ {item.price}</p>

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
