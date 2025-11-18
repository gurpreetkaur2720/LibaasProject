import React from "react";
import ProductCard from "../components/ProductCard";
import "../components/ProductCard.css";
import "./Home.css";
import bannerImg from "../assets/images/bb6.jpg";

// ⭐ Updated Featured Products (MongoDB _id)
const featuredProducts = [
  { _id: "691b51c1a4692182a0cd6098", image: require("../assets/images/bb1.jpg"), name: "Noor-e-Nazaakat", price: 1999 },
  { _id: "691b51c1a4692182a0cd6099", image: require("../assets/images/bb2.jpg"), name: "Zehra", price: 1799 },
  { _id: "691b51c1a4692182a0cd609a", image: require("../assets/images/bb3.jpg"), name: "Sitara", price: 1899 },
  { _id: "691b51c1a4692182a0cd609b", image: require("../assets/images/bb4.jpg"), name: "Mehekti Shaam", price: 1699 },
  { _id: "691b51c1a4692182a0cd609c", image: require("../assets/images/bb5.jpg"), name: "Chandni Raat", price: 2099 },
  { _id: "691b51c1a4692182a0cd609d", image: require("../assets/images/bb6.jpg"), name: "Husn-e-Haya", price: 1999 },
  { _id: "691b51c1a4692182a0cd609e", image: require("../assets/images/bb7.jpg"), name: "Gulzar-e-Ishq", price: 1899 },
  { _id: "691b51c1a4692182a0cd60ac", image: require("../assets/images/pehrin10.jpg"), name: "Sahiba", price: 1599 },
];

// ⭐ Updated Gallery
const galleryImages = [
  require("../assets/images/pehrin1.jpg"),
  require("../assets/images/pehrin2.jpg"),
  require("../assets/images/pehrin3.jpg"),
  require("../assets/images/pehrin4.jpg"),
  require("../assets/images/pehrin5.jpg"),
  require("../assets/images/pehrin6.jpg"),
  require("../assets/images/pehrin7.jpg"),
  require("../assets/images/pehrin9.jpg"),
];

export default function Home() {
  return (
    <div className="home-page">

      {/* Banner Section */}
      <div className="home-banner" style={{ backgroundImage: `url(${bannerImg})` }}>
        <div className="home-banner-content">
          <h1>LIBAAS</h1>
          <p>Welcome to LIBAAS — Discover Our New Fashion Trends</p>
          <button className="shop-btn">Shop Now</button>
        </div>
      </div>

      {/* Featured Products */}
      <h2 className="home-heading">✨ Featured Products ✨</h2>
      <div className="home-product-grid">
        {featuredProducts.map((item) => (
          <ProductCard key={item._id} product={item} />
        ))}
      </div>

      {/* Image Gallery */}
      <h2 className="home-heading">Image Gallery</h2>
      <div className="home-image-gallery">
        {galleryImages.map((src, i) => (
          <img key={i} src={src} alt="gallery" />
        ))}
      </div>
    </div>
  );
}
