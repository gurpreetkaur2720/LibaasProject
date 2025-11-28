import React from "react";
import ProductCard from "../components/ProductCard";
import "../components/ProductCard.css";
import "../pages/PageStyles.css";
import { ambarsariApsaras } from "../data/productData";

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
          {ambarsariApsaras.map((item) => (
            <ProductCard key={item._id} product={item} />
          ))}
        </div>
      </div>
    </div>
  );
}
