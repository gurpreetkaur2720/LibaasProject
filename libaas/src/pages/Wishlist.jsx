// src/pages/Wishlist.jsx
import axios from "axios";
import "./Wishlist.css";
import { useEffect, useState } from "react";
import { products } from "../data/productData"

export default function Wishlist() {
  const [wishlist, setWishlist] = useState([]); // array of items { product: {...}, ... }
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");
  const baseUrl = "http://localhost:8080/wishlist";

  // Fetch wishlist on mount
  useEffect(() => {
    const fetchWishlist = async () => {
      if (!token) {
        setWishlist([]);
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        // Try to use the axios instance. If it doesn't include auth, we pass header explicitly.
        const res = await axios.get(baseUrl, {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        });


        // Typical shapes:
        // 1) res.data.wishlist -> array of items
        // 2) res.data -> array
        const data = res?.data?.wishlist ?? res?.data ?? [];

        // Normalize items so we always have item.product
        const normalized = data.map((it) => {
          // if backend returned product inside item
          if (it && it.product) return it;
          // if backend returned full product object directly
          if (it && it._id && it.name) return { product: it };
          // if backend returned { productId, product } or similar
          if (it && it.productId && it.product) return it;
          // fallback — keep original
          return it;
        });

        setWishlist(normalized);
      } catch (err) {
        console.error("Failed to fetch wishlist:", err);
        setWishlist([]);
      } finally {
        setLoading(false);
      }
    };

    fetchWishlist();
  }, [token]);

  // Remove an item from wishlist by productId
  const removeItem = async (productId) => {
    if (!token) return alert("Please login first!");

    // optimistic UI: remove immediately
    setWishlist((prev) => prev.filter((it) => {
      const pid = it?.product?._id ?? it?.productId ?? it?._id;
      return pid !== productId;
    }));

    try {
      // Preferred: delete endpoint that accepts body { productId }
      await axios.delete(`${baseUrl}/remove`, {
        data: { productId }, // IMPORTANT
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });
    } catch (err) {
      // fallback: try delete with param (some backends use /remove/:id)
      try {
        await axios.delete(`${baseUrl}/remove`, {
          data: { productId }, // IMPORTANT
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        });
      } catch (err2) {
        console.error("Failed to remove from wishlist:", err, err2);
        alert("Could not remove item from wishlist. Please try again.");
        // revert UI change (best-effort)
        // refetch wishlist to be safe
        try {
          const res = await axios.get(baseUrl, {
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          });
          const data = res?.data?.wishlist ?? res?.data ?? [];
          const normalized = data.map((it) => (it?.product ? it : { product: it }));
          setWishlist(normalized);
        } catch (e) {
          console.error("Failed to reload wishlist after remove failure:", e);
        }
      }
    }
  };

  // Move to cart: add to cart then remove from wishlist
  // Accepts the wishlist item (so we can know raw data if needed)
  const moveToCart = async (item) => {
    if (!token) return alert("Please login first!");
    const product = item?.product ?? item;
    const productId = product?._id;

    if (!productId) return alert("Invalid product.");

    try {
      // 1) Add to cart (adjust endpoint/body to match your backend)
      await axios.post(
        "/cart/add",
        { productId, quantity: 1 },
        { headers: { Authorization: token } }
      );

      // 2) Remove from wishlist (reuse removeItem to keep consistency)
      await removeItem(productId);

      alert("Moved to cart successfully.");
    } catch (err) {
      console.error("Failed to move to cart:", err);
      alert("Could not move item to cart. Please try again.");
      // optionally refetch wishlist if state got out of sync
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
    <div className="wishlist-container">
      <h2>Your Wishlist ❤️</h2>

      {wishlist.length === 0 ? (
        <p className="empty-text">No items in wishlist.</p>
      ) : (
        <div className="wishlist-grid">
          {wishlist.map((item, idx) => {
            const p = item.product ?? item;
            const key = p?._id ?? idx;

            return (
              <div key={key} className="wishlist-card">
                <img src={p.image || "/images/placeholder.png"} alt={p.name} />
                <h3>{p.name}</h3>
                <p>₹ {p.price}</p>

                <button className="move-btn" onClick={() => moveToCart(item)}>
                  Move to Cart
                </button>

                <button
                  className="remove-btn"
                  onClick={() => {
                    if (window.confirm("Remove this item from your wishlist?")) {
                      removeItem(p._id);
                    }
                  }}
                >
                  Remove
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
