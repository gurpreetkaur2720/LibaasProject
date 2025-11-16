// src/components/ProductCard.jsx
import React, { useEffect, useState } from "react";
import { FaHeart, FaRegHeart, FaShoppingCart, FaEye } from "react-icons/fa";
import ProductModal from "./ProductModal";
import api from "../axiosConfig";
import "./ProductCard.css";

export default function ProductCard({ _id, image, name, price }) {
  const [showModal, setShowModal] = useState(false);
  const [wishlisted, setWishlisted] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);

  // ---------------- Load wishlist status ----------------
  useEffect(() => {
    const checkWishlist = async () => {
      try {
        const res = await api.get("/api/user/wishlist"); // token handled in axiosConfig
        const exists = res.data.wishlist.some((item) => item.product._id === _id);
        setWishlisted(exists);
      } catch (err) {
        console.log(err);
      }
    };

    checkWishlist();
  }, [_id]);

  // ---------------- Toggle Wishlist ----------------
  const toggleWishlist = async () => {
    try {
      if (!localStorage.getItem("token")) return alert("Please login first!");

      if (!wishlisted) {
        await api.post("/api/user/wishlist/add", { productId: _id });
        setWishlisted(true);
      } else {
        await api.delete(`/api/user/wishlist/remove/${_id}`);
        setWishlisted(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  // ---------------- Add to Cart ----------------
  const addToCart = async () => {
    try {
      if (!localStorage.getItem("token")) return alert("Please login first!");

      await api.post("/api/user/cart/add", { productId: _id });
      setAddedToCart(true);
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
