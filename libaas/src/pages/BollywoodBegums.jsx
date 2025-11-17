import React from "react";
import ProductCard from "../components/ProductCard";
import "../components/ProductCard.css";
import "../pages/PageStyles.css";
import bollywoodBanner from "../assets/images/bb5.jpg";

const products = [
  { _id: "64d1f5a3b0c7e0a12f34501", image: require("../assets/images/bb1.jpg"), name: "Noor-e-Nazaakat", price: 1999 },
  { _id: "64d1f5a3b0c7e0a12f34502", image: require("../assets/images/bb2.jpg"), name: "Zehra", price: 1799 },
  { _id: "64d1f5a3b0c7e0a12f34503", image: require("../assets/images/bb3.jpg"), name: "Sitara", price: 1899 },
  { _id: "64d1f5a3b0c7e0a12f34504", image: require("../assets/images/bb4.jpg"), name: "Mehekti Shaam", price: 1699 },
  { _id: "64d1f5a3b0c7e0a12f34505", image: require("../assets/images/bb5.jpg"), name: "Chandni Raat", price: 2099 },
  { _id: "64d1f5a3b0c7e0a12f34506", image: require("../assets/images/bb6.jpg"), name: "Husn-e-Haya", price: 1999 },
  { _id: "64d1f5a3b0c7e0a12f34507", image: require("../assets/images/bb7.jpg"), name: "Gulzar-e-Ishq", price: 1899 },
];

export default function BollywoodBegums() {
  return (
    <div className="category-page">
      <div className="banner" style={{ backgroundImage: `url(${bollywoodBanner})` }}>
        <div className="banner-content">
          <h1>Bollywood Begums</h1>
          <p>"Screen Se Real Life Tak"</p>
        </div>
      </div>

      <div className="category-box">
        <h2 className="category-heading">Bollywood Begums</h2>
        <div className="product-grid">
          {products.map(item => <ProductCard key={item._id} product={item} />)}
        </div>
      </div>
    </div>
  );
}
