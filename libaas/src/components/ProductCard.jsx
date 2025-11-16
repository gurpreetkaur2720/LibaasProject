// src/components/ProductCard.jsx
import React, { useEffect, useState } from "react";
import { FaHeart, FaRegHeart, FaShoppingCart, FaEye } from "react-icons/fa";
import ProductModal from "./ProductModal";
import api from "../axiosConfig";
import "./ProductCard.css";

export default function ProductCard({ product }) {
  const { _id, image, name, price } = product;

  const [showModal, setShowModal] = useState(false);
  const [wishlisted, setWishlisted] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);

  const token = localStorage.getItem("token");

  // -------- Load Wishlist status --------
  useEffect(() => {
    if (!token) return;

    const checkWishlist = async () => {
      try {
        const response = await api.get("/api/user/wishlist");

        const exists = response.data.wishlist.some(
          (item) => item.product._id === _id
        );

        setWishlisted(exists);
      } catch (err) {
        console.log("Wishlist fetch error:", err);
      }
    };

    checkWishlist();
  }, [_id, token]);

  // -------- Toggle Wishlist --------
  const toggleWishlist = async () => {
    if (!token) return alert("Please login first!");

    try {
      if (!wishlisted) {
        await api.post("/api/user/wishlist/add", { productId: _id });
        setWishlisted(true);
      } else {
        await api.delete(`/api/user/wishlist/remove/${_id}`);
        setWishlisted(false);
      }
    } catch (err) {
      console.log("Wishlist toggle error:", err);
    }
  };

  // -------- Add to Cart --------
  const addToCart = async () => {
    if (!token) return alert("Please login first!");

    try {
      await api.post("/api/user/cart/add", { productId: _id });
      setAddedToCart(true);
      alert("Added to Cart!");
    } catch (err) {
      console.log("Add to cart error:", err);
    }
  };

  return (
    <>
      <div className="product-card">
        <div className="image-wrapper">
          <img src={image} alt={name} className="product-image" />

          {/* Wishlist Heart */}
          <div className="icon-circle wishlist" onClick={toggleWishlist}>
            {wishlisted ? <FaHeart color="red" /> : <FaRegHeart />}
          </div>

          {/* Action Icons */}
          <div className="action-icons">
            <div className="icon-circle" onClick={() => setShowModal(true)}>
              <FaEye />
            </div>

            <div className="icon-circle" onClick={addToCart}>
              <FaShoppingCart color={addedToCart ? "green" : "black"} />
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
