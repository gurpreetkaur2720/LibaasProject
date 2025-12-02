import React, { useEffect, useState } from "react";
import "../pages/MyOrders.css";
import axios from "../axiosConfig";
import { FaEye } from "react-icons/fa";
import ProductModal from "../components/ProductModal";

export default function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get("http://localhost:8080/orders/my-orders", {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        });
        setOrders(res.data.orders || []);
      } catch (err) {
        console.log("Error fetching orders", err);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="orders-page">
      <h2 className="orders-title">My Orders</h2>

      <div className="orders-container">
        {orders.length === 0 ? (
          <p className="no-orders">You have not placed any orders yet.</p>
        ) : (
          orders.map((order) => (
            <div key={order._id} className="order-wrapper">

              {/* ORDER HEADER */}
              <div className="order-header">
                <p><strong>Order ID:</strong> {order._id}</p>
                <p className="order-status">{order.status}</p>
              </div>

              {/* ORDER ITEMS */}
              <div className="order-items">
                {order.items.map((item, idx) => (
                  <div key={idx} className="order-item-card">
                    <div className="order-img-wrapper">
                      <img
                        src={item.image || "/images/placeholder.png"}
                        alt={item.name}
                        className="order-product-img"
                      />
                      <div
                        className="order-view-icon"
                        onClick={() => setSelectedProduct(item)}
                      >
                        <FaEye />
                      </div>
                    </div>

                    <div className="order-item-info">
                      <p><strong>{item.name}</strong></p>
                      {item.description && <p>{item.description}</p>}
                      <p>Price: ₹ {item.price}</p>
                      <p>Quantity: {item.quantity}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* TOTAL + DATE */}
              <div className="order-summary">
                <p><strong>Total Amount:</strong> ₹ {order.totalAmount}</p>
                <p><strong>Date:</strong> {new Date(order.createdAt).toLocaleDateString()}</p>
              </div>
            </div>
          ))
        )}
      </div>

      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </div>
  );
}
