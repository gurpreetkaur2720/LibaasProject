// src/components/ProductCard.jsx
import React, { useEffect, useState } from "react";
import { FaHeart, FaRegHeart, FaShoppingCart, FaEye } from "react-icons/fa";
import ProductModal from "./ProductModal";
import api from "../axiosConfig";
import "./ProductCard.css";

export default function ProductCard({ _id, image, name, price }) {
  const [showModal, setShowModal] = useState(false);
  const [wishlisted, setWishlisted] = useState(false);

  const token = localStorage.getItem("token");

  // LOAD WISHLIST STATUS
  useEffect(() => {
    if (!token) return;

    const checkWishlist = async () => {
      try {
        const res = await api.get("/api/user/wishlist", {
          headers: { "x-auth-token": token }
        });

        const exists = res.data.wishlist.some((item) => item._id === _id);
        setWishlisted(exists);
      } catch (err) {
        console.log(err);
      }
    };

    checkWishlist();
  }, [_id, token]);

  // ❤️ TOGGLE WISHLIST
  const toggleWishlist = async () => {
    if (!token) return alert("Please login first!");

    try {
      if (!wishlisted) {
        // ADD
        await api.post(
          "/api/user/wishlist/add",
          { productId: _id },
          { headers: { "x-auth-token": token } }
        );
        setWishlisted(true);
      } else {
        // REMOVE
        await api.delete(`/api/user/wishlist/remove/${_id}`, {
          headers: { "x-auth-token": token }
        });
        setWishlisted(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  // 🛒 ADD TO CART
  const addToCart = async () => {
    if (!token) return alert("Please login first!");

    try {
      await api.post(
        "/api/user/cart/add",
        { productId: _id },
        { headers: { "x-auth-token": token } }
      );

      alert("Added to Cart!");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="product-card">
        <div className="image-wrapper">
          <img src={image} alt={name} className="product-image" />

          {/* ❤️ Wishlist */}
          <div className="icon-circle wishlist" onClick={toggleWishlist}>
            {wishlisted ? <FaHeart color="red" /> : <FaRegHeart />}
          </div>

          <div className="action-icons">
            <div className="icon-circle" onClick={() => setShowModal(true)}>
              <FaEye />
            </div>

            <div className="icon-circle" onClick={addToCart}>
              <FaShoppingCart />
            </div>
          </div>
        </div>

        <div className="product-info">
          <h3>{name}</h3>
          <p className="product-price">₹ {price}</p>
        </div>
      </div>

      {showModal && (
        <ProductModal
          product={{ _id, name, image, price }}
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  );
}
