// src/components/ProductModal.jsx
import React, { useEffect, useState, useCallback } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import "./ProductModal.css";
import axios from "axios";

export default function ProductModal({ product, onClose }) {
  // hooks (always unconditional)
  const [wishlisted, setWishlisted] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [working, setWorking] = useState(false); // disables buttons during network

  // sizes available (could come from product in future)
  const availableSizes = product?.sizes ?? ["XS", "S", "M", "L"];

  // selected size state (default to first available)
  const [selectedSize, setSelectedSize] = useState(availableSizes[0]);

  // safe product values
  const productId = product?._id ?? product?.productId ?? null;
  const title = product?.name ?? "Product";
  const image = product?.image ?? "/images/placeholder.png";
  const price = product?.price ?? 0;

  const wishlistBase = "http://localhost:8080/wishlist";
  const cartUpdateUrl = "http://localhost:8080/cart/update";
  const token = localStorage.getItem("token");
  const authHeader = token ? { Authorization: token } : {};

  // Fetch whether this product is in wishlist when modal opens / productId changes
  useEffect(() => {
    let alive = true;

    const fetchWishlistState = async () => {
      if (!token || !productId) {
        if (alive) setWishlisted(false);
        return;
      }
      try {
        const res = await axios.get(wishlistBase, { headers: authHeader });
        const wishlistItems = res?.data?.wishlist ?? res?.data ?? [];
        const isIn = wishlistItems.some((it) => it.productId === productId || it._id === productId);
        if (alive) setWishlisted(Boolean(isIn));
      } catch (err) {
        console.error("Could not fetch wishlist:", err);
        if (alive) setWishlisted(false);
      }
    };

    fetchWishlistState();

    return () => {
      alive = false;
    };
  }, [productId, token]); // re-run when modal receives different product

  // keep selectedSize in sync if availableSizes change
  useEffect(() => {
    setSelectedSize(availableSizes[0]);
  }, [availableSizes.join(",")]); // re-run if availableSizes changes

  // Close on Escape key
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose?.();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  // Helpers
  const clampQuantity = useCallback((n) => Math.max(1, Math.floor(n)), []);

  const toggleWishlist = async () => {
    if (!token) return alert("Please login first!");
    if (!productId) return;

    if (working) return;
    setWorking(true);

    try {
      if (!wishlisted) {
        const res = await axios.post(
          `${wishlistBase}/add`,
          { productId, image },
          { headers: authHeader }
        );
        if (res.status === 201 || res.status === 200) {
          setWishlisted(true);
        }
      } else {
        const res = await axios.delete(`${wishlistBase}/remove`, {
          data: { productId },
          headers: authHeader,
        });
        if (res.status === 200) {
          setWishlisted(false);
        }
      }
    } catch (err) {
      console.error("Wishlist toggle failed:", err);
      alert(err?.response?.data?.message || "Could not update wishlist.");
    } finally {
      setWorking(false);
    }
  };

  const addToCart = async () => {
    if (!token) return alert("Please login first!");
    if (!productId) return;
    if (working) return;
    setWorking(true);

    try {
      // Include selectedSize in payload — backend may ignore if not implemented
      await axios.put(
        cartUpdateUrl,
        { productId, action: "add", quantity: clampQuantity(quantity), size: selectedSize },
        { headers: authHeader }
      );

      alert(`Added to cart (Size: ${selectedSize}).`);
      onClose?.(); // close modal after adding
    } catch (err) {
      console.error("Add to cart failed:", err);
      alert(err?.response?.data?.message || "Could not add to cart.");
    } finally {
      setWorking(false);
    }
  };

  // Overlay click closes modal
  const onOverlayClick = (e) => {
    if (e.target === e.currentTarget) onClose?.();
  };

  if (!product) return null;

  return (
    <div className="modal-overlay" onClick={onOverlayClick} role="dialog" aria-modal="true">
      <div className="modal-content">
        <button className="modal-close" onClick={onClose} aria-label="Close">
          ✕
        </button>

        <div className="modal-left">
          <img src={image} alt={title} />
        </div>

        <div className="modal-right">
          <div className="details-box">
            <h2 className="product-title">{title}</h2>
            <p className="product-price">Rs. {price}</p>

            <div
              className={`wishlist-btn ${wishlisted ? "active" : ""}`}
              onClick={toggleWishlist}
              role="button"
              aria-pressed={wishlisted}
              title={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
              style={{ pointerEvents: working ? "none" : "auto", opacity: working ? 0.6 : 1 }}
            >
              {wishlisted ? <FaHeart /> : <FaRegHeart />}
            </div>

            <p className="label">Size:</p>
            <div className="sizes">
              {availableSizes.map((size) => (
                <button
                  key={size}
                  type="button"
                  className={`size-btn ${selectedSize === size ? "active" : ""}`}
                  onClick={() => setSelectedSize(size)}
                  aria-pressed={selectedSize === size}
                >
                  {size}
                </button>
              ))}
            </div>

            <p className="label">Quantity:</p>
            <div className="quantity">
              <button
                type="button"
                onClick={() => setQuantity((q) => clampQuantity(q - 1))}
                disabled={working}
              >
                -
              </button>

              <input
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(clampQuantity(Number(e.target.value || 1)))}
              />

              <button type="button" onClick={() => setQuantity((q) => clampQuantity(q + 1))} disabled={working}>
                +
              </button>
            </div>

            <div className="actions">
              <button className="add-to-cart" onClick={addToCart} disabled={working}>
                {working ? "Adding..." : `Add to Cart${selectedSize ? ` — ${selectedSize}` : ""}`}
              </button>
              <button
                className="buy-now"
                onClick={() => {
                  alert("Buy now clicked — implement checkout flow");
                }}
                disabled={working}
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
