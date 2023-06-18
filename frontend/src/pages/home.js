import React, { useState } from "react";
import HomepageSlider from "../components/HomepageSlider";
import vector from "../assets/Vector.png";
import shipping from "../assets/free-shipping1.png";
import freesample from "../assets/freesample.png";
import surpriseGift from "../assets/surprise-gift-box.png";
import featureditem1 from "../assets/featuredcollection-item1.png";
import featureditem2 from "../assets/featuredcollection-item2.png";
import aboutus from "../assets/Rectangle3239.png";

import { Link } from "react-router-dom";
const Home = () => {
  const [products, setProducts] = useState([]);
  return (
    <div>
      <HomepageSlider />
      <div className="img-wrapper">
        <img src={vector} alt="vector" />
      </div>
      <section className="service grid">
        <div className="service-info_title">
          <div className="text-center">Only on blissworld.com</div>
        </div>

        <div className="service-features grid">
          <div className="service-feature">
            <div className="img-wrapper">
              <img src={shipping} alt="shipping" />
            </div>
            <div>
              <div>Free shipping</div>
              <span>(on order over $40)</span>
            </div>
          </div>
          <div className="service-feature">
            <div className="img-wrapper">
              <img src={freesample} alt="shipping" />
            </div>
            <div>
              <div>Free sample</div>
              <span>(Yes, please)</span>
            </div>
          </div>
          <div className="service-feature">
            <div className="img-wrapper">
              <img src={surpriseGift} alt="shipping" />
            </div>
            <div>
              <div>Surprise</div>
              <span>(you will love. Trust)</span>
            </div>
          </div>
        </div>
      </section>
      <div className="featured-collection_wrapper">
        <div className="featured-collection grid">
          <div className="img-wrapper">
            <img src={featureditem1} />
          </div>
          <div className="featured-collection_info grid">
            <h1>Lemon and & sage collection</h1>
            <p>
              Refresh and reenergize from head -to-toe our iconic citrus-scented
              faves.
            </p>
            <button>
              <Link to="/product/category/perfume">Shop now</Link>
            </button>
          </div>
          <svg
            className="small"
            width="79"
            height="79"
            viewBox="0 0 79 79"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="39.1047" cy="39.7411" r="39.1047" fill="#FFC4C4" />
          </svg>
          <svg
            className="big"
            width="144"
            height="159"
            viewBox="0 0 144 159"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="93.1038" cy="65.7292" r="92.3538" fill="#FFC4C4" />
          </svg>
        </div>
        <div className="featured-collection grid">
          <div className="img-wrapper">
            <img src={featureditem2} alt="image" />
          </div>
          <div className="featured-collection_info grid">
            <h1>New ! blackhead breakdown</h1>
            <p>
              Refresh and reenergize from head -to-toe our iconic citrus-scented
              faves.
            </p>
            <button>
              <Link to="/product/category/makeup">Shop now</Link>
            </button>
          </div>
          <svg
            className="small"
            width="79"
            height="79"
            viewBox="0 0 79 79"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="39.1047" cy="39.7411" r="39.1047" fill="#FFC4C4" />
          </svg>
          <svg
            className="big"
            width="144"
            height="159"
            viewBox="0 0 144 159"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="93.1038" cy="65.7292" r="92.3538" fill="#FFC4C4" />
          </svg>
        </div>
      </div>

      <section className="about-us grid grid-50">
        <div className="about-us_img">
          <div className="img-wrapper">
            <img src={aboutus} alt="image" />
          </div>
          <svg
            width="233"
            height="190"
            viewBox="0 0 233 190"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="233" height="190" fill="#EE6983" />
          </svg>
          <svg
            width="233"
            height="190"
            viewBox="0 0 233 190"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="233" height="190" fill="#EE6983" />
          </svg>
        </div>
        <div className="about-us_info">
          <h5>About us</h5>
          <h1>Clean, Cruelty-Free,Dermatologist-Tested</h1>
          <p>
            We are a clean, cruelty-free, planet-friendly skincare brand that
            delivers transformative, dermatologist-tested products for total
            skin happiness.
          </p>
          <button>Explore more</button>
        </div>
      </section>
    </div>
  );
};

export default Home;
