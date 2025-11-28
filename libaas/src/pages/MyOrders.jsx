import React, { useEffect, useState } from "react";
import "../pages/MyOrders.css";
import axios from "../axiosConfig";

export default function MyOrders() {
  const [orders, setOrders] = useState([]);

  // FETCH ORDERS FROM BACKEND
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get("/api/orders/my-orders", {
          withCredentials: true,
        });
        setOrders(res.data.orders);
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
            <div key={order._id} className="order-card">
              
              {/* TOP SECTION */}
              <div className="order-header">
                <p><strong>Order ID:</strong> {order._id}</p>
                <p className="order-status">{order.status}</p>
              </div>

              {/* PRODUCT IMAGES */}
              <div className="order-items">
                {order.items.map((item) => (
                  <img
                    key={item.product._id}
                    src={item.product.image}
                    alt={item.product.name}
                    className="order-product-img"
                  />
                ))}
              </div>

              {/* INFO SECTION */}
              <div className="order-info">
                <p><strong>Total Amount:</strong> ₹{order.totalAmount}</p>
                <p>
                  <strong>Date:</strong>{" "}
                  {new Date(order.createdAt).toLocaleDateString()}
                </p>
              </div>

              {/* BUTTONS */}
              <div className="order-buttons">
                <button className="btn-reorder">Order Again</button>
                <button className="btn-details">View Details</button>
              </div>

            </div>
          ))
        )}
      </div>
    </div>
  );
}
