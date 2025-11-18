import React from "react";
import ProductCard from "../components/ProductCard";
import "../components/ProductCard.css";
import "../pages/PageStyles.css";
import lahoriBanner from "../assets/images/pehrin8.jpg";

const products = [
  { _id: "691b51c1a4692182a0cd60a8", image: require("../assets/images/bb1.jpg"), name: "Afsana", price: 1299 },
  { _id: "691b51c1a4692182a0cd60a9", image: require("../assets/images/bb2.jpg"), name: "Mehnoor", price: 1399 },
  { _id: "691b51c1a4692182a0cd60aa", image: require("../assets/images/pehrin11.jpg"), name: "Noorjahan", price: 1499 },
  { _id: "691b51c1a4692182a0cd60ab", image: require("../assets/images/bb4.jpg"), name: "Gulzar", price: 1199 },
  { _id: "691b51c1a4692182a0cd60ac", image: require("../assets/images/pehrin10.jpg"), name: "Sahiba", price: 1599 },
  { _id: "691b51c1a4692182a0cd60ad", image: require("../assets/images/pehrin13.jpg"), name: "Rukhsana", price: 1699 },
  { _id: "691b51c1a4692182a0cd60ae", image: require("../assets/images/pehrin12.jpg"), name: "Dilruba", price: 1499 },
  { _id: "691b51c1a4692182a0cd60af", image: require("../assets/images/pehrin1.jpg"), name: "Mehrunisa", price: 1399 },
];

export default function LahoriKudiyan() {
  return (
    <div className="category-page">
      <div className="banner" style={{ backgroundImage: `url(${lahoriBanner})` }}>
        <div className="banner-content">
          <h1>Lahori Kudiyan</h1>
          <p>“Nazakat, Shauq & Sheher di Shaan”</p>
        </div>
      </div>

      <div className="category-box">
        <h2 className="category-heading">Lahori Kudiyan</h2>
        <div className="product-grid">
          {products.map((item) => (
            <ProductCard key={item._id} product={item} />
          ))}
        </div>
      </div>
    </div>
  );
}
