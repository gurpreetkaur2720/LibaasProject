import React, { useEffect, useState } from "react";
import { FaHeart, FaRegHeart, FaShoppingCart, FaEye } from "react-icons/fa";
import ProductModal from "./ProductModal";
import api from "../axiosConfig";
import "./ProductCard.css";

export default function ProductCard({ product }) {
  const _id = product?._id;
  const image = product?.image;
  const name = product?.name;
  const price = product?.price;

  const [showModal, setShowModal] = useState(false);
  const [wishlisted, setWishlisted] = useState(false);

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token || !_id) return;

    const checkWishlist = async () => {
      try {
        const response = await api.get("/api/user/wishlist", { headers: { "x-auth-token": token } });
        const exists = response.data.wishlist.some(item => item._id === _id);
        setWishlisted(exists);
      } catch (err) {
        console.log("Wishlist fetch error:", err);
      }
    };

    checkWishlist();
  }, [_id, token]);

  if (!product) return null;

  const toggleWishlist = async () => {
    if (!token) return alert("Please login first!");

    try {
      if (!wishlisted) {
        await api.post("/api/user/wishlist/add", { productId: _id }, { headers: { "x-auth-token": token } });
        setWishlisted(true);
      } else {
        await api.delete(`/api/user/wishlist/remove/${_id}`, { headers: { "x-auth-token": token } });
        setWishlisted(false);
      }
    } catch (err) {
      console.log("Wishlist toggle error:", err);
    }
  };

  const addToCart = async () => {
    if (!token) return alert("Please login first!");

    try {
      await api.post("/api/user/cart/add", { productId: _id }, { headers: { "x-auth-token": token } });
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
          <div className="icon-circle wishlist" onClick={toggleWishlist}>
            {wishlisted ? <FaHeart color="red" /> : <FaRegHeart />}
          </div>
          <div className="action-icons">
            <div className="icon-circle" onClick={() => setShowModal(true)}><FaEye /></div>
            <div className="icon-circle" onClick={addToCart}><FaShoppingCart /></div>
          </div>
        </div>
        <div className="product-info">
          <h3>{name}</h3>
          <p className="product-price">₹ {price}</p>
        </div>
      </div>

      {showModal && (
        <ProductModal product={{ _id, name, image, price }} onClose={() => setShowModal(false)} />
      )}
    </>
  );
}
