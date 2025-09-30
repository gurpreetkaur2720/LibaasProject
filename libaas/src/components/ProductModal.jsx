import React, { useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import "./ProductModal.css";

export default function ProductModal({ product, onClose }) {
  const [wishlisted, setWishlisted] = useState(false);
  const [quantity, setQuantity] = useState(1);

  if (!product) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        {/* Close button */}
        <button className="modal-close" onClick={onClose}>
          ✕
        </button>

        {/* Left: product image */}
        <div className="modal-left">
          <img src={product.image} alt={product.name} />
        </div>

        {/* Right: product details */}
        <div className="modal-right">
          <div className="details-box">
            <h2 className="product-title">{product.name}</h2>
            <p className="product-price">Rs. {product.price}</p>

            {/* Wishlist */}
            <div
              className={`wishlist-btn ${wishlisted ? "active" : ""}`}
              onClick={() => setWishlisted(!wishlisted)}
            >
              {wishlisted ? <FaHeart /> : <FaRegHeart />}
            </div>

            <p className="label">Size:</p>
            <div className="sizes">
              {["XS", "S", "M", "L"].map((size) => (
                <button key={size} className="size-btn">
                  {size}
                </button>
              ))}
            </div>

            <p className="label">Quantity:</p>
            <div className="quantity">
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>
                -
              </button>
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, +e.target.value))}
              />
              <button onClick={() => setQuantity(quantity + 1)}>+</button>
            </div>

            <div className="actions">
              <button className="add-to-cart">Add to Cart</button>
              <button className="buy-now">Buy Now</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
