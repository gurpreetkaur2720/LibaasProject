import React from "react";
import ProductCard from "../components/ProductCard";
import "../components/ProductCard.css";
import "../pages/PageStyles.css";
import ambarsariBanner from "../assets/images/pehrin1.jpg";

const products = [
  { _id: "64d1f5a3b0c7e0a12f34511", image: require("../assets/images/pehrin1.jpg"), name: "Aaliyah", price: 1299 },
  { _id: "64d1f5a3b0c7e0a12f34512", image: require("../assets/images/pehrin6.jpg"), name: "Aamchi Apsara", price: 1399 },
  { _id: "64d1f5a3b0c7e0a12f34513", image: require("../assets/images/pehrin3.jpg"), name: "Chashni", price: 1499 },
  { _id: "64d1f5a3b0c7e0a12f34514", image: require("../assets/images/pehrin4.jpg"), name: "Fuljhadi", price: 1199 },
  { _id: "64d1f5a3b0c7e0a12f34515", image: require("../assets/images/pehrin5.jpg"), name: "Garam Masala", price: 1599 },
  { _id: "64d1f5a3b0c7e0a12f34516", image: require("../assets/images/pehrin2.jpg"), name: "Gulbahaar", price: 1699 },
  { _id: "64d1f5a3b0c7e0a12f34517", image: require("../assets/images/pehrin7.jpg"), name: "Nargis", price: 1499 },
  { _id: "64d1f5a3b0c7e0a12f34518", image: require("../assets/images/pehrin9.jpg"), name: "Vanni", price: 1599 },
];

export default function AmbarsariApsaras() {
  return (
    <div className="category-page">
      <div className="banner" style={{ backgroundImage: `url(${ambarsariBanner})` }}>
        <div className="banner-content">
          <h1>Ambarsari Apsaras</h1>
          <p>“Jutti, Bhangra & Amritsari Zaika”</p>
        </div>
      </div>

      <div className="category-box">
        <h2 className="category-heading">Ambarsari Apsaras</h2>
        <div className="product-grid">
          {products.map(item => <ProductCard key={item._id} product={item} />)}
        </div>
      </div>
    </div>
  );
}
