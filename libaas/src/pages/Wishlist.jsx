// src/pages/Wishlist.jsx
import axios from "axios";
import "./Wishlist.css";
import { useEffect, useState } from "react";
import { products } from "../data/productData";

export default function Wishlist() {
  const [wishlist, setWishlist] = useState([]); // stores full product info
  const [loading, setLoading] = useState(true);
  const [workingId, setWorkingId] = useState(null); // id for item currently being processed (disable buttons)
  const token = localStorage.getItem("token");
  const wishlistBase = "http://localhost:8080/wishlist";
  const cartUpdateUrl = "http://localhost:8080/cart/update";

  // Fetch wishlist → convert productId → product object
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

        // backend gives: { wishlist: [{ productId: "..." }, ...] } or similar
        const raw = res?.data?.wishlist ?? res?.data ?? [];
        const ids = new Set((raw || []).map((w) => w.productId));

        // match local products
        const finalWishlist = products.filter((p) => ids.has(p._id));

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

  // Remove from wishlist
  const removeItem = async (productId) => {
    if (!token) return alert("Please login first!");

    // Optimistic UI update: remove locally first
    const prev = wishlist;
    setWishlist((prevList) => prevList.filter((item) => item._id !== productId));

    try {
      await axios.delete(`${wishlistBase}/remove`, {
        data: { productId },
        headers: { Authorization: token },
      });
    } catch (err) {
      console.error("Failed to remove from wishlist:", err);
      alert("Could not remove item from wishlist. Reverting.");
      // revert UI
      setWishlist(prev);
    }
  };

  // Move to cart — uses unified update endpoint (PUT /cart/update)
  const moveToCart = async (product) => {
    if (!token) return alert("Please login first!");

    const productId = product._id;
    setWorkingId(productId);

    try {
      // 1) Add to cart via update endpoint - action: add
      const payload = {
        productId,
        action: "add",
        quantity: 1,
      };

      await axios.put(cartUpdateUrl, payload, {
        headers: { Authorization: token },
      });

      // 2) If cart add succeeded, remove from wishlist
      await removeItem(productId);

      alert("Moved to cart successfully.");
    } catch (err) {
      console.error("Failed to move to cart:", err);
      // better error message from server if present
      const msg =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        "Could not move item to cart. Please try again.";
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
    <div className="wishlist-container">``
      <h2>Your Wishlist ❤️</h2>

      {wishlist.length === 0 ? (
        <p className="empty-text">No items in wishlist.</p>
      ) : (
        <div className="wishlist-grid">
          {wishlist.map((p) => (
            <div key={p._id} className="wishlist-card">
              <img src={p.image || "/images/placeholder.png"} alt={p.name} />
              <h3>{p.name}</h3>
              <p>₹ {p.price}</p>

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
                  if (window.confirm("Remove this item?")) {
                    removeItem(p._id);
                  }
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
  );
}
