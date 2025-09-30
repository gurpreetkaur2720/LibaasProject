import React from "react";
import ProductCard from "../components/ProductCard";
import "../components/ProductCard.css";
import "./Home.css";

// Banner image
import bannerImg from "../assets/images/bb6.jpg";

// Featured products (8 total)
import bb1 from "../assets/images/bb1.jpg";
import bb2 from "../assets/images/bb2.jpg";
import bb3 from "../assets/images/bb3.jpg";
import bb4 from "../assets/images/bb4.jpg";
import bb5 from "../assets/images/bb5.jpg";
import bb6 from "../assets/images/bb6.jpg";
import bb7 from "../assets/images/bb7.jpg";
import bb8 from "../assets/images/pehrin10.jpg";

// Gallery images (8)
import g1 from "../assets/images/pehrin1.jpg";
import g2 from "../assets/images/pehrin2.jpg";
import g3 from "../assets/images/pehrin3.jpg";
import g4 from "../assets/images/pehrin4.jpg";
import g5 from "../assets/images/pehrin5.jpg";
import g6 from "../assets/images/pehrin6.jpg";
import g7 from "../assets/images/pehrin7.jpg";
import g8 from "../assets/images/pehrin9.jpg";

export default function Home() {
  const featuredProducts = [
    { image: bb1, name: "Noor-e-Nazaakat", price: 1999 },
    { image: bb2, name: "Zehra", price: 1799 },
    { image: bb3, name: "Sitara", price: 1899 },
    { image: bb4, name: "Mehekti Shaam", price: 1699 },
    { image: bb5, name: "Chandni Raat", price: 2099 },
    { image: bb6, name: "Husn-e-Haya", price: 1999 },
    { image: bb7, name: "Gulzar-e-Ishq", price: 1899 },
    { image: bb8, name: "Mehrunisa", price: 1599 },
  ];

  const galleryImages = [g1, g2, g3, g4, g5, g6, g7, g8];

  return (
    <div className="home-page">
      {/* Banner */}
      <div
        className="home-banner"
        style={{ backgroundImage: `url(${bannerImg})` }}
      >
        <div className="home-banner-content">
          <h1>LIBAAS</h1>
          <p>Welcome to LIBAAS — Discover Our New Fashion Trends</p>
          <button className="shop-btn">Shop Now</button>
        </div>
      </div>

      {/* Featured Products */}
      <h2 className="home-heading">✨ Featured Products ✨</h2>
      <div className="home-product-grid">
        {featuredProducts.map((item, i) => (
          <ProductCard
            key={i}
            image={item.image}
            name={item.name}
            price={item.price}
          />
        ))}
      </div>

      {/* Image Gallery */}
      <h2 className="home-heading">Image Gallery</h2>
      <div className="home-image-gallery">
        {galleryImages.map((src, i) => (
          <img key={i} src={src} alt={`Gallery ${i + 1}`} />
        ))}
      </div>
    </div>
  );
}
