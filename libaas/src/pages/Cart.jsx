// src/pages/Cart.jsx
import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import "./Cart.css";
import { products } from "../data/productData";

export default function Cart() {
  const [cartItems, setCartItems] = useState([]); // { productId, quantity, product? }
  const [loading, setLoading] = useState(true);
  const [workingId, setWorkingId] = useState(null); // productId being updated
  const token = localStorage.getItem("token");

  const cartGetUrl = "http://localhost:8080/cart"; // GET
  const cartUpdateUrl = "http://localhost:8080/cart/update"; // PUT

  // helper: map server items (productId, quantity) -> enriched items with product object
  const mapItemsToProducts = (items = []) =>
    items
      .map((it) => {
        const product = products.find((p) => p._id === it.productId) || null;
        return { ...it, product };
      })
      .filter((it) => it.product !== null); // drop items that don't match local products

  // fetch cart on mount
  useEffect(() => {
    const fetchCart = async () => {
      setLoading(true);
      if (!token) {
        setCartItems([]);
        setLoading(false);
        return;
      }

      try {
        const res = await axios.get(cartGetUrl, {
          headers: { Authorization: token },
        });

        // backend returns { success: true, cart: { items: [{ productId, quantity }], ... } }
        const rawItems = res?.data?.cart?.items ?? [];
        const mapped = mapItemsToProducts(rawItems);
        setCartItems(mapped);
      } catch (err) {
        console.error("Failed to fetch cart:", err);
        setCartItems([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, [token]);

  // compute total using local products
  const total = useMemo(() => {
    return cartItems.reduce((sum, it) => {
      const price = Number(it.product?.price ?? 0);
      const qty = Number(it.quantity ?? 0);
      return sum + price * qty;
    }, 0);
  }, [cartItems]);

  // update quantity helper (set exact quantity)
  const updateQuantity = async (productId, newQty) => {
    if (!token) return alert("Please login first!");
    if (newQty < 1) return; // guard: use remove for deleting

    setWorkingId(productId);
    // optimistic UI: update locally and revert on failure
    const prev = [...cartItems];
    setCartItems((prevList) =>
      prevList.map((it) => (it.productId === productId ? { ...it, quantity: newQty } : it))
    );

    try {
      await axios.put(
        cartUpdateUrl,
        { productId, action: "set", quantity: newQty },
        { headers: { Authorization: token } }
      );
      // success — backend saved; nothing else to do
    } catch (err) {
      console.error("Failed to update quantity:", err);
      alert(err?.response?.data?.message || "Could not update quantity. Reverting.");
      setCartItems(prev); // revert
    } finally {
      setWorkingId(null);
    }
  };

  // remove item
  const removeItem = async (productId) => {
    if (!token) return alert("Please login first!");
    if (!window.confirm("Remove this item from your cart?")) return;

    setWorkingId(productId);
    const prev = [...cartItems];
    setCartItems((prevList) => prevList.filter((it) => it.productId !== productId));

    try {
      await axios.put(
        cartUpdateUrl,
        { productId, action: "remove" },
        { headers: { Authorization: token } }
      );
    } catch (err) {
      console.error("Failed to remove item:", err);
      alert(err?.response?.data?.message || "Could not remove item. Reverting.");
      setCartItems(prev); // revert
    } finally {
      setWorkingId(null);
    }
  };

  // decrement helper (if hits 0, remove)
  const decrement = (productId, currentQty) => {
    const next = Math.max(0, currentQty - 1);
    if (next === 0) {
      removeItem(productId);
    } else {
      updateQuantity(productId, next);
    }
  };

  if (loading) {
    return (
      <div className="cart-container">
        <h2>Your Cart 🛒</h2>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <h2>Your Cart 🛒</h2>

      {cartItems.length === 0 ? (
        <p className="empty-text">Your cart is empty.</p>
      ) : (
        <>
          <div className="cart-grid">
            {cartItems.map((item) => (
              <div key={item.product._id} className="cart-card">
                <img src={item.product.image || "/images/placeholder.png"} alt={item.product.name} />
                <h3>{item.product.name}</h3>
                <p>₹ {item.product.price}</p>

                <div className="quantity-wrapper">
                  <button
                    onClick={() => decrement(item.productId, item.quantity)}
                    disabled={workingId === item.productId}
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                    disabled={workingId === item.productId}
                  >
                    +
                  </button>
                </div>

                <button
                  className="remove-btn"
                  onClick={() => removeItem(item.productId)}
                  disabled={workingId === item.productId}
                >
                  {workingId === item.productId ? "Processing..." : "Remove"}
                </button>
              </div>
            ))}
          </div>

          <div className="cart-total">
            <h3>Total: ₹ {total}</h3>
            <button
              className="checkout-btn"
              onClick={() => alert("Proceed to checkout — implement payment flow")}
            >
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
}
