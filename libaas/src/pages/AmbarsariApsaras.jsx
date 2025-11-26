import React from "react";
import ProductCard from "../components/ProductCard";
import "../components/ProductCard.css";
import "../pages/PageStyles.css";

const products = [
  { _id: "691b51c1a4692182a0cd60a0", image: "/images/pehrin1.jpg", name: "Aaliyah", price: 1299 },
  { _id: "691b51c1a4692182a0cd60a1", image: "/images/pehrin6.jpg", name: "Aamchi Apsara", price: 1399 },
  { _id: "691b51c1a4692182a0cd60a2", image: "/images/pehrin3.jpg", name: "Chashni", price: 1499 },
  { _id: "691b51c1a4692182a0cd60a3", image: "/images/pehrin4.jpg", name: "Fuljhadi", price: 1199 },
  { _id: "691b51c1a4692182a0cd60a4", image: "/images/pehrin5.jpg", name: "Garam Masala", price: 1599 },
  { _id: "691b51c1a4692182a0cd60a5", image: "/images/pehrin2.jpg", name: "Gulbahaar", price: 1699 },
  { _id: "691b51c1a4692182a0cd60a6", image: "/images/pehrin7.jpg", name: "Nargis", price: 1499 },
  { _id: "691b51c1a4692182a0cd60a7", image: "/images/pehrin9.jpg", name: "Vanni", price: 1599 },
];

export default function AmbarsariApsaras() {
  return (
    <div className="category-page">
      <div className="banner" style={{ backgroundImage: `url("/images/pehrin1.jpg")` }}>
        <div className="banner-content">
          <h1>Ambarsari Apsaras</h1>
          <p>“Jutti, Bhangra & Amritsari Zaika”</p>
        </div>
      </div>

      <div className="category-box">
        <h2 className="category-heading">Ambarsari Apsaras</h2>
        <div className="product-grid">
          {products.map((item) => (
            <ProductCard key={item._id} product={item} />
          ))}
        </div>
      </div>
    </div>
  );
}
