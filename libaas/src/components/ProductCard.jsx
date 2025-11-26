import React, { useEffect, useState } from "react";
import { FaHeart, FaRegHeart, FaShoppingCart, FaEye } from "react-icons/fa";
import ProductModal from "./ProductModal";
import api from "../axiosConfig";
import "./ProductCard.css";
import axios from "axios";

export default function ProductCard({ product }) {
  const _id = product?._id;
  const image = product?.image;
  const name = product?.name;
  const price = product?.price;
  const baseUrl = "http://localhost:8080/wishlist";

  const [showModal, setShowModal] = useState(false);
  const [wishlisted, setWishlisted] = useState(false);

  const token = localStorage.getItem("token");

  // Fetch wishlist to check if this product exists
  useEffect(() => {
    const fetchWishlist = async () => {
      if (!token) return;

      try {
        const res = await axios.get(baseUrl, {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        });

        const wishlistItems = res.data.wishlist || [];

        // Check if this product exists
        const isWishlisted = wishlistItems.some(
          (item) => item.productId === _id || item._id === _id
        );

        setWishlisted(isWishlisted);

      } catch (err) {
        console.log("Fetch wishlist error:", err);
      }
    };

    fetchWishlist();
  }, [_id]);


  if (!product) return null;

  // Toggle Wishlist (Add/Remove)
  const toggleWishlist = async () => {
    if (!token) return alert("Please login first!");



    try {
      if (!wishlisted) {
        // ADD to wishlist
        await axios.post(
          `${baseUrl}/add`,
          { productId: _id, image },
          {
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          }
        );
      } else {
        // REMOVE from wishlist
        await axios.delete(`${baseUrl}/remove`, {
          data: { productId: _id }, // IMPORTANT
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        });
      }

      setWishlisted((prev) => !prev);

    } catch (err) {
      console.log("Wishlist toggle error:", err);
    }
  };


  // Add to Cart
  const addToCart = async () => {
    if (!token) return alert("Please login first!");

    try {
      await api.post("/api/user/cart/add", { productId: _id, image });
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

          {/* Wishlist Icon */}
          <div className="icon-circle wishlist" onClick={toggleWishlist}>
            {wishlisted ? <FaHeart color="red" /> : <FaRegHeart />}
          </div>

          {/* Action Buttons */}
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

      {/* Product Modal */}
      {showModal && (
        <ProductModal
          product={{ _id, name, image, price }}
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  );
}
