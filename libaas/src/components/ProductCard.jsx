import React, { useState } from "react";
import { FaHeart, FaRegHeart, FaShoppingCart, FaEye } from "react-icons/fa";
import ProductModal from "./ProductModal";
import "./ProductCard.css";

export default function ProductCard({ image, name, price }) {
  const [wishlisted, setWishlisted] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const product = { image, name, price };

  return (
    <>
      <div className="product-card">
        <div className="image-wrapper">
          <img src={image} alt={name} className="product-image" />

          {/* Wishlist Icon (with white circle) */}
          <div
            className={`icon-circle wishlist ${wishlisted ? "active" : ""}`}
            onClick={() => setWishlisted(!wishlisted)}
          >
            {wishlisted ? <FaHeart /> : <FaRegHeart />}
          </div>

          {/* Other Action Icons */}
          <div className="action-icons">
            {/* ✅ View opens modal */}
            <div className="icon-circle" onClick={() => setShowModal(true)}>
              <FaEye title="View" />
            </div>

            <div className="icon-circle">
              <FaShoppingCart title="Add to Cart" />
            </div>
          </div>
        </div>

        <div className="product-info">
          <h3 className="product-name">{name}</h3>
          <p className="product-price">
            <span className="old-price">₹ 1,199.00</span>{" "}
            <span className="new-price">₹ {price}</span>
          </p>
        </div>
      </div>

      {/* ✅ Modal renders when showModal is true */}
      {showModal && (
        <ProductModal product={product} onClose={() => setShowModal(false)} />
      )}
    </>
  );
}
