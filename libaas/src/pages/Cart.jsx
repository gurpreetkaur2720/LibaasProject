// src/pages/Cart.jsx
import React, { useEffect, useState } from "react";
import api from "../axiosConfig";
import "./Cart.css";

export default function Cart() {
  const [cart, setCart] = useState([]);
  const token = localStorage.getItem("token");

  // -------- Load Cart --------
  useEffect(() => {
    if (!token) return;

    const loadCart = async () => {
      try {
        const response = await api.get("/api/user/cart", {
          headers: { "x-auth-token": token },
        });
        setCart(response.data.cart);
      } catch (err) {
        console.error("Cart Load Error:", err);
      }
    };

    loadCart();
  }, [token]);

  // -------- Remove Item --------
  const removeItem = async (productId) => {
    try {
      await api.delete(`/api/user/cart/remove/${productId}`, {
        headers: { "x-auth-token": token },
      });
      setCart((prev) => prev.filter((item) => item.product._id !== productId));
    } catch (err) {
      console.error("Remove Failed:", err);
    }
  };

  // -------- Update Quantity --------
  const updateQuantity = async (productId, newQty) => {
    try {
      // Optional: you can create a route for updating quantity if backend supports
      // For now, just update locally
      setCart((prev) =>
        prev.map((item) =>
          item.product._id === productId ? { ...item, quantity: newQty } : item
        )
      );
    } catch (err) {
      console.error("Quantity Update Error:", err);
    }
  };

  // -------- Calculate Total --------
  const total = cart.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  return (
    <div className="cart-container">
      <h2>Your Cart 🛒</h2>
      <div className="cart-grid">
        {cart.length === 0 ? (
          <p className="empty-text">Your cart is empty.</p>
        ) : (
          cart.map((item) => (
            <div key={item.product._id} className="cart-card">
              <img src={item.product.image} alt={item.product.name} />
              <h3>{item.product.name}</h3>
              <p>₹ {item.product.price}</p>

              <div className="quantity-wrapper">
                <button
                  onClick={() =>
                    updateQuantity(item.product._id, Math.max(1, item.quantity - 1))
                  }
                >
                  -
                </button>
                <span>{item.quantity}</span>
                <button onClick={() => updateQuantity(item.product._id, item.quantity + 1)}>
                  +
                </button>
              </div>

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

      {cart.length > 0 && (
        <div className="cart-total">
          <h3>Total: ₹ {total}</h3>
          <button className="checkout-btn">Proceed to Checkout</button>
        </div>
      )}
    </div>
  );
}
