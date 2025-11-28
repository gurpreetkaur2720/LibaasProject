import React from "react";
import ProductCard from "../components/ProductCard";
import "../components/ProductCard.css";
import "../pages/PageStyles.css";
import { lahoriKudiyan } from "../data/productData";

export default function LahoriKudiyan() {
  return (
    <div className="category-page">
      <div className="banner" style={{ backgroundImage: `url("/images/pehrin8.jpg")` }}>
        <div className="banner-content">
          <h1>Lahori Kudiyan</h1>
          <p>“Nazakat, Shauq & Sheher di Shaan”</p>
        </div>
      </div>

      <div className="category-box">
        <h2 className="category-heading">Lahori Kudiyan</h2>
        <div className="product-grid">
          {lahoriKudiyan.map((item) => (
            <ProductCard key={item._id} product={item} />
          ))}
        </div>
      </div>
    </div>
  );
}
