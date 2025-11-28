import React, { useState } from "react";
import { QrReader } from "react-qr-reader";
import api from "../axiosConfig"; 
import "../styles/Payment.css";  // ⭐ Import your CSS file

const Payment = () => {
  const [qrData, setQrData] = useState("");

  const handleCOD = async () => {
    try {
      await api.post("/api/orders/create", {
        paymentMethod: "COD",
        paymentStatus: "Pending",
      });

      alert("Order Placed Successfully (COD)!");
    } catch (err) {
      console.log(err);
      alert("Something went wrong");
    }
  };

  const handleQRPayment = async () => {
    if (!qrData) return alert("Please scan QR first!");

    try {
      await api.post("/api/orders/create", {
        paymentMethod: "QR",
        paymentStatus: "Paid",
        transactionId: qrData,
      });

      alert("Payment Successful & Order Stored!");
    } catch (err) {
      console.log(err);
      alert("Payment Failed");
    }
  };

  return (
    <div className="payment-container">
      <h1 className="payment-title">Choose Payment Method</h1>

      {/* QR PAYMENT */}
      <div className="qr-section">
        <h2 className="section-title">Scan QR to Pay</h2>

        <div className="qr-box">
          <QrReader
            constraints={{ facingMode: "environment" }}
            onResult={(result, error) => {
              if (!!result) {
                setQrData(result?.text);
              }
              if (error) console.log(error);
            }}
            className="qr-scanner"
          />
        </div>

        {qrData && <p className="scan-text">Scanned Code: {qrData}</p>}

        <button className="pay-btn" onClick={handleQRPayment}>
          Pay Now
        </button>
      </div>

      <hr className="divider" />

      {/* COD */}
      <div className="cod-section">
        <h2 className="section-title">Cash on Delivery</h2>
        <button className="cod-btn" onClick={handleCOD}>
          Place COD Order
        </button>
      </div>
    </div>
  );
};

export default Payment;
