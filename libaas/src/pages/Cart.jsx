// src/pages/Cart.jsx
import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import "./Cart.css";
import { allProducts } from "../data/productData";
import { FaEye } from "react-icons/fa"; // Eye icon
import ProductModal from "../components/ProductModal"; 


export default function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [workingId, setWorkingId] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null); // For modal
  const token = localStorage.getItem("token");

  const cartGetUrl = "http://localhost:8080/cart";
  const cartUpdateUrl = "http://localhost:8080/cart/update";

  const mapItemsToProducts = (items = []) =>
    items
      .map((it) => {
        const product = allProducts.find((p) => p._id === it.productId) || null;
        return { ...it, product };
      })
      .filter((it) => it.product !== null);

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

  const total = useMemo(() => {
    return cartItems.reduce((sum, it) => {
      const price = Number(it.product?.price ?? 0);
      const qty = Number(it.quantity ?? 0);
      return sum + price * qty;
    }, 0);
  }, [cartItems]);

  const updateQuantity = async (productId, newQty) => {
    if (!token) return alert("Please login first!");
    if (newQty < 1) return;

    setWorkingId(productId);
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
    } catch (err) {
      console.error("Failed to update quantity:", err);
      alert(err?.response?.data?.message || "Could not update quantity. Reverting.");
      setCartItems(prev);
    } finally {
      setWorkingId(null);
    }
  };

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
      setCartItems(prev);
    } finally {
      setWorkingId(null);
    }
  };

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
    <>
      <div className="cart-container">
        <h2>Your Cart 🛒</h2>

        {cartItems.length === 0 ? (
          <p className="empty-text">Your cart is empty.</p>
        ) : (
          <>
            <div className="cart-grid">
              {cartItems.map((item) => (
                <div key={item.product._id} className="cart-card">
                  {/* IMAGE + VIEW ICON */}
                  <div className="cart-img-wrapper">
                    <img
                      src={item.product.image || "/images/placeholder.png"}
                      alt={item.product.name}
                    />
                    <div
                      className="cart-view-icon"
                      onClick={() => setSelectedProduct(item.product)}
                    >
                      <FaEye />
                    </div>
                  </div>

                  {/* NAME & DESCRIPTION */}
                  <h3>{item.product.name}</h3>
                  {item.product.description && (
                    <p className="cart-description">{item.product.description}</p>
                  )}

                  {/* PRICE */}
                  <p>₹ {item.product.price}</p>

                  {/* QUANTITY */}
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

                  {/* REMOVE */}
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

            {/* TOTAL & CHECKOUT */}
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
