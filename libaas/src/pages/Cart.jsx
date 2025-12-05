import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaEye } from "react-icons/fa";
import ProductModal from "../components/ProductModal";
import { allProducts } from "../data/productData";
import "./Cart.css";

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [workingId, setWorkingId] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const [showAddressModal, setShowAddressModal] = useState(false);
  const [address, setAddress] = useState("");
  const [buyNowItem, setBuyNowItem] = useState(null);

  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const cartGetUrl = "http://localhost:8080/cart";
  const cartUpdateUrl = "http://localhost:8080/cart/update";

  const mapItemsToProducts = (items = []) =>
    items
      .map((it) => {
        const product = allProducts.find((p) => p._id === it.productId) || null;
        return { ...it, product };
      })
      .filter((it) => it.product !== null);

  // Fetch cart items
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
    return cartItems.reduce(
      (sum, it) => sum + Number(it.product?.price) * Number(it.quantity),
      0
    );
  }, [cartItems]);

  // Update quantity
  const updateQuantity = async (productId, newQty) => {
    if (!token) return alert("Please login first!");
    if (newQty < 1) return;

    setWorkingId(productId);
    const prev = [...cartItems];

    setCartItems((old) =>
      old.map((it) =>
        it.productId === productId ? { ...it, quantity: newQty } : it
      )
    );

    try {
      await axios.put(
        cartUpdateUrl,
        { productId, action: "set", quantity: newQty },
        { headers: { Authorization: token } }
      );
    } catch (err) {
      console.error("Failed to update quantity:", err);
      alert("Could not update. Reverting.");
      setCartItems(prev);
    } finally {
      setWorkingId(null);
    }
  };

  // Remove item
  const removeItem = async (productId) => {
    if (!token) return alert("Please login first!");
    if (!window.confirm("Remove this item from your cart?")) return;

    setWorkingId(productId);
    const prev = [...cartItems];

    setCartItems((old) => old.filter((it) => it.productId !== productId));

    try {
      await axios.put(
        cartUpdateUrl,
        { productId, action: "remove" },
        { headers: { Authorization: token } }
      );
    } catch (err) {
      console.error("Failed to remove item:", err);
      alert("Could not remove. Reverting.");
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

  // Handle Checkout / Buy Now
  const handleCheckout = (singleItem) => {
    if (!token) return alert("Please login first!");

    if (singleItem && singleItem._id) {
      setBuyNowItem(singleItem);
    } else if (cartItems.length === 0) {
      return alert("Your cart is empty!");
    } else {
      setBuyNowItem(null);
    }

    setShowAddressModal(true);
  };

  // Place Order
  const placeOrder = async () => {
    if (!address.trim()) return alert("Address is required!");

    try {
      let orderItems = [];

      if (buyNowItem) {
        orderItems.push({
          productId: buyNowItem._id,
          name: buyNowItem.name,
          image: buyNowItem.image,
          price: buyNowItem.price,
          quantity: buyNowItem.quantity,
          size: buyNowItem.size,
        });
      } else {
        orderItems = cartItems.map((it) => ({
          productId: it.product._id,
          name: it.product.name,
          image: it.product.image,
          price: it.product.price,
          quantity: it.quantity,
          size: it.size || null,
        }));
      }

      const res = await axios.post(
        "http://localhost:8080/orders/create",
        { items: orderItems, deliveryAddress: address },
        { headers: { Authorization: token } }
      );

      if (res.data.success) {
        alert("Order Placed Successfully!");
        if (!buyNowItem) setCartItems([]);
        setShowAddressModal(false);
        setAddress("");
        setBuyNowItem(null);
        navigate("/my-orders");
      }
    } catch (err) {
      console.error("Checkout failed:", err);
      alert(err?.response?.data?.message || "Order failed");
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
                  <div className="cart-img-wrapper">
                    <img
                      src={item.product.image || "/images/placeholder.png"}
                      alt={item.product.name}
                      className="cart-product-img"
                    />
                    <div
                      className="cart-view-icon"
                      onClick={() => setSelectedProduct(item.product)}
                    >
                      <FaEye />
                    </div>
                  </div>

                  <h3>{item.product.name}</h3>
                  <p className="cart-description">{item.product.description}</p>

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
                      onClick={() =>
                        updateQuantity(item.productId, item.quantity + 1)
                      }
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
              <button className="checkout-btn" onClick={() => handleCheckout()}>
                Proceed to Checkout (COD)
              </button>
            </div>
          </>
        )}
      </div>

      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onBuyNow={handleCheckout}
        />
      )}

      {showAddressModal && (
        <div className="address-overlay">
          <div className="address-container">
            <h3 className="address-title">Enter Delivery Address 🏠📞📍</h3>

            <textarea
              className="address-input"
              placeholder="Enter full delivery address in one line (e.g., Name, House/Flat No., Street, Area, City, State, PIN, Phone Number)"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            ></textarea>

            <div className="address-btn-box">
              <button className="address-confirm" onClick={placeOrder}>
                Confirm & Place Order
              </button>

              <button
                className="address-cancel"
                onClick={() => setShowAddressModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
