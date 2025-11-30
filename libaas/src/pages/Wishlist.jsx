// src/pages/Wishlist.jsx
import axios from "axios";
import "./Wishlist.css";
import { useEffect, useState } from "react";
import { allProducts } from "../data/productData";
import { FaEye } from "react-icons/fa";
import ProductModal from "../components/ProductModal"; // ✅ IMPORTANT

export default function Wishlist() {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [workingId, setWorkingId] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null); // ✅ MODAL STATE
  const token = localStorage.getItem("token");

  const wishlistBase = "http://localhost:8080/wishlist";
  const cartUpdateUrl = "http://localhost:8080/cart/update";

  // Load wishlist
  useEffect(() => {
    const fetchWishlist = async () => {
      if (!token) {
        setWishlist([]);
        setLoading(false);
        return;
      }

      setLoading(true);

      try {
        const res = await axios.get(wishlistBase, {
          headers: { Authorization: token },
        });

        const raw = res?.data?.wishlist ?? res?.data ?? [];
        const ids = new Set(raw.map((w) => w.productId));

        const finalWishlist = allProducts.filter((p) => ids.has(p._id));

        setWishlist(finalWishlist);
      } catch (err) {
        console.error("Failed to fetch wishlist:", err);
        setWishlist([]);
      } finally {
        setLoading(false);
      }
    };

    fetchWishlist();
  }, [token]);

  // Remove item
  const removeItem = async (productId) => {
    if (!token) return alert("Please login first!");

    const prev = wishlist;
    setWishlist((prevList) => prevList.filter((item) => item._id !== productId));

    try {
      await axios.delete(`${wishlistBase}/remove`, {
        data: { productId },
        headers: { Authorization: token },
      });
    } catch (err) {
      console.error("Failed to remove from wishlist:", err);
      alert("Could not remove item. Reverting.");
      setWishlist(prev);
    }
  };

  // Move to Cart
  const moveToCart = async (product) => {
    if (!token) return alert("Please login first!");

    const productId = product._id;
    setWorkingId(productId);

    try {
      await axios.put(
        cartUpdateUrl,
        { productId, action: "add", quantity: 1 },
        { headers: { Authorization: token } }
      );

      await removeItem(productId);

      alert("Moved to cart successfully.");
    } catch (err) {
      const msg =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        "Could not move item to cart.";
      alert(msg);
    } finally {
      setWorkingId(null);
    }
  };

  if (loading) {
    return (
      <div className="wishlist-container">
        <h2>Your Wishlist ❤️</h2>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <>
      <div className="wishlist-container">
        <h2>Your Wishlist ❤️</h2>

        {wishlist.length === 0 ? (
          <p className="empty-text">No items in wishlist.</p>
        ) : (
          <div className="wishlist-grid">
            {wishlist.map((p) => (
              <div key={p._id} className="wishlist-card">
                <div className="wishlist-img-wrapper">
                  <img src={p.image} alt={p.name} />

                  {/* 👁 VIEW ICON */}
                  <div
                    className="view-icon"
                    onClick={() => setSelectedProduct(p)}
                  >
                    <FaEye />
                  </div>
                </div>

                <h3>{p.name}</h3>

                {/* ⭐ description added */}
                {p.description && (
                  <p className="wl-description">{p.description}</p>
                )}

                <p className="wl-price">₹ {p.price}</p>

                <button
                  className="move-btn"
                  onClick={() => moveToCart(p)}
                  disabled={workingId === p._id}
                >
                  {workingId === p._id ? "Moving..." : "Move to Cart"}
                </button>

                <button
                  className="remove-btn"
                  onClick={() => {
                    if (window.confirm("Remove this item?")) removeItem(p._id);
                  }}
                  disabled={workingId === p._id}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* PRODUCT MODAL */}
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </>
  );
}
