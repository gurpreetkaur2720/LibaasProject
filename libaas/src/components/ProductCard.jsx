// small improvements: authHeader, workingId, cancel-safe effect, auto-remove wishlist on move
import React, { useEffect, useState } from "react";
import { FaHeart, FaRegHeart, FaShoppingCart, FaEye } from "react-icons/fa";
import ProductModal from "./ProductModal";
import "./ProductCard.css";
import axios from "axios";

export default function ProductCard({ product }) {
  // hooks (always at top)
  const [showModal, setShowModal] = useState(false);
  const [wishlisted, setWishlisted] = useState(false);
  const [workingId, setWorkingId] = useState(null);

  // safe product props
  const _id = product?._id;
  const image = product?.image;
  const name = product?.name;
  const price = product?.price;

  const wishlistBase = "http://localhost:8080/wishlist";
  const cartUpdateUrl = "http://localhost:8080/cart/update";

  const token = localStorage.getItem("token");
  const authHeader = token ? { Authorization: token } : {};

  // fetch wishlist membership — cancel-safe
  useEffect(() => {
    let mounted = true;
    const fetchWishlist = async () => {
      if (!token || !_id) {
        if (mounted) setWishlisted(false);
        return;
      }
      try {
        const res = await axios.get(wishlistBase, { headers: authHeader });
        const wishlistItems = res?.data?.wishlist ?? res?.data ?? [];
        const isWish = wishlistItems.some(i => i.productId === _id || i._id === _id);
        if (mounted) setWishlisted(Boolean(isWish));
      } catch (err) {
        if (mounted) setWishlisted(false);
        console.error("Fetch wishlist error:", err);
      }
    };
    fetchWishlist();
    return () => { mounted = false; };
  }, [_id, token]); // run when id or token changes

  if (!product) return null;

  // toggle wishlist (disable while running)
  const toggleWishlist = async () => {
    if (!token) return alert("Please login first!");
    if (workingId === _id) return;
    setWorkingId(_id);

    try {
      if (!wishlisted) {
        const res = await axios.post(`${wishlistBase}/add`, { productId: _id, image }, { headers: authHeader });
        if (res.status === 201 || res.status === 200) setWishlisted(true);
      } else {
        const res = await axios.delete(`${wishlistBase}/remove`, { data: { productId: _id }, headers: authHeader });
        if (res.status === 200) setWishlisted(false);
      }
    } catch (err) {
      console.error("Wishlist toggle error:", err);
      alert(err?.response?.data?.message || "Failed to update wishlist.");
    } finally {
      setWorkingId(null);
    }
  };

  // move to cart, then remove from wishlist (optional)
  const moveToCart = async () => {
    if (!token) return alert("Please login first!");
    if (workingId === _id) return;
    setWorkingId(_id);

    try {
      await axios.put(cartUpdateUrl, { productId: _id, action: "add", quantity: 1 }, { headers: authHeader });
      // optionally remove from wishlist after successful add
      if (wishlisted) {
        await axios.delete(`${wishlistBase}/remove`, { data: { productId: _id }, headers: authHeader });
        setWishlisted(false);
      }
      alert("Moved to cart successfully.");
    } catch (err) {
      console.error("Failed to move to cart:", err);
      alert(err?.response?.data?.message || "Could not move item to cart. Try again.");
    } finally {
      setWorkingId(null);
    }
  };

  return (
    <>
      <div className="product-card">
        <div className="image-wrapper">
          <img src={image || "/images/placeholder.png"} alt={name} className="product-image" />

          <div
            className={`icon-circle wishlist ${wishlisted ? "active" : ""}`}
            onClick={toggleWishlist}
            style={{ pointerEvents: workingId === _id ? "none" : "auto", opacity: workingId === _id ? 0.6 : 1 }}
            title={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
          >
            {wishlisted ? <FaHeart color="red" /> : <FaRegHeart />}
          </div>

          <div className="action-icons">
            <div className="icon-circle" onClick={() => setShowModal(true)}><FaEye /></div>
            <div className="icon-circle" onClick={moveToCart} style={{ pointerEvents: workingId === _id ? "none" : "auto", opacity: workingId === _id ? 0.6 : 1 }}>
              <FaShoppingCart />
            </div>
          </div>
        </div>

        <div className="product-info">
          <h3>{name}</h3>
          <p className="product-price">₹ {price}</p>
        </div>
      </div>

      {showModal && <ProductModal product={{ _id, name, image, price }} onClose={() => setShowModal(false)} />}
    </>
  );
}
