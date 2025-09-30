import React from "react";
import "./AboutUs.css";
import bannerImg from "../assets/images/pehrin9.jpg"; // replace with your banner image

export default function AboutUs() {
  return (
    <div className="about-page">
      {/* Banner Section */}
      <div className="about-banner">
        <img src={bannerImg} alt="Libaas Story" className="banner-image" />
        <div className="banner-text">
          <h1>Our Story</h1>
        </div>
      </div>

      {/* Content Section */}
      <div className="about-content">
        <h2>LIBAAS</h2>
        <p>
          In the future, <strong>Libaas</strong> will be known as a go-to brand
          for stylish and affordable kurtis for girls. We aim to launch trendy,
          comfortable, and elegant kurti collections, offer designs that blend
          traditional charm with modern fashion, and expand into college wear,
          office wear, and festive collections. We also plan to build a strong
          online presence with our own website and mobile app, promote through
          Instagram marketing, influencer tie-ups, and digital ads, and
          eventually expand into boys' ethnic wear and more categories. ✨{" "}
          <strong>Libaas</strong> will represent confidence, culture, and
          everyday fashion for toda's girls.
        </p>

        <p>
          From everyday wear to festive outfits, every piece we design carries
          the essence of tradition with a modern twist. Our goal is to bring you
          timeless styles that make you feel confident, graceful, and connected
          to your roots.
        </p>

        <h2>Our Goals</h2>
        <ul>
          <li>🌸 To redefine ethnic wear for today's generation.</li>
          <li>🌸 To create sustainable and high-quality clothing.</li>
          <li>🌸 To make Libaas a household name across India & abroad.</li>
          <li>🌸 To launch a mobile app and expand into men's wear & accessories.</li>
          <li>🌸 To grow through digital marketing and meaningful collaborations.</li>
        </ul>

        <p className="closing">
          This is just the beginning. With your love and support,{" "}
          <strong>Libaas</strong> will continue to grow, creating stories woven
          in fabric. 💜
        </p>
      </div>
    </div>
  );
}
