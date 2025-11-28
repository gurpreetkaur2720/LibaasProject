import React from "react";
import ProductCard from "../components/ProductCard";
import "../components/ProductCard.css";
import "../pages/PageStyles.css";
import { bollywoodBegums } from "../data/productData";

export default function BollywoodBegums() {
  return (
    <div className="category-page">
      <div className="banner" style={{ backgroundImage: `url("/images/bb5.jpg")` }}>
        <div className="banner-content">
          <h1>Bollywood Begums</h1>
          <p>"Screen Se Real Life Tak"</p>
        </div>
      </div>

      <div className="category-box">
        <h2 className="category-heading">Bollywood Begums</h2>
        <div className="product-grid">
          {bollywoodBegums.map((item) => (
            <ProductCard key={item._id} product={item} />
          ))}
        </div>
      </div>
    </div>
  );
}
