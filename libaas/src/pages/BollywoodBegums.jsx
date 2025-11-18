import React from "react";
import ProductCard from "../components/ProductCard";
import "../components/ProductCard.css";
import "../pages/PageStyles.css";
import bollywoodBanner from "../assets/images/bb5.jpg";

const products = [
  { _id: "691b51c1a4692182a0cd6098", image: require("../assets/images/bb1.jpg"), name: "Noor-e-Nazaakat", price: 1999 },
  { _id: "691b51c1a4692182a0cd6099", image: require("../assets/images/bb2.jpg"), name: "Zehra", price: 1799 },
  { _id: "691b51c1a4692182a0cd609a", image: require("../assets/images/bb3.jpg"), name: "Sitara", price: 1899 },
  { _id: "691b51c1a4692182a0cd609b", image: require("../assets/images/bb4.jpg"), name: "Mehekti Shaam", price: 1699 },
  { _id: "691b51c1a4692182a0cd609c", image: require("../assets/images/bb5.jpg"), name: "Chandni Raat", price: 2099 },
  { _id: "691b51c1a4692182a0cd609d", image: require("../assets/images/bb6.jpg"), name: "Husn-e-Haya", price: 1999 },
  { _id: "691b51c1a4692182a0cd609e", image: require("../assets/images/bb7.jpg"), name: "Gulzar-e-Ishq", price: 1899 },
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
          {products.map((item) => (
            <ProductCard key={item._id} product={item} />
          ))}
        </div>
      </div>
    </div>
  );
}
