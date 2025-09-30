import React from "react";
import ProductCard from "../components/ProductCard";
import "../components/ProductCard.css";
import "../pages/PageStyles.css";

// Import images
import aaliyah from "../assets/images/pehrin1.jpg";
import aanchi from "../assets/images/pehrin6.jpg";
import chashni from "../assets/images/pehrin3.jpg";
import fuljhadi from "../assets/images/pehrin4.jpg";
import garam from "../assets/images/pehrin5.jpg";
import gulbahaar from "../assets/images/pehrin2.jpg";
import nargis from "../assets/images/pehrin7.jpg";
import vanni from "../assets/images/pehrin9.jpg";

//  Banner image
import ambarsariBanner from "../assets/images/pehrin1.jpg";

export default function AmbarsariApsaras() {
  const products = [
    { image: aaliyah, name: "Aaliyah", price: 1299 },
    { image: aanchi, name: "Aamchi Apsara", price: 1399 },
    { image: chashni, name: "Chashni", price: 1499 },
    { image: fuljhadi, name: "Fuljhadi", price: 1199 },
    { image: garam, name: "Garam Masala", price: 1599 },
    { image: gulbahaar, name: "Gulbahaar", price: 1699 },
    { image: nargis, name: "Nargis", price: 1499 },
    { image: vanni, name: "Vanni", price: 1599 },
  ];

  return (
    <div className="category-page">
      {/*  Banner Section */}
      <div
        className="banner"
        style={{ backgroundImage: `url(${ambarsariBanner})` }}
      >
        <div className="banner-content">
          <h1>Ambarsari Apsaras</h1>
          <p>“Jutti, Bhangra & Amritsari Zaika”</p>
        </div>
      </div>

      <div className="category-box">
        <h2 className="category-heading">Ambarsari Apsaras</h2>
        <div className="product-grid">
          {products.map((item, index) => (
            <ProductCard
              key={index}
              image={item.image}
              name={item.name}
              price={item.price}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
