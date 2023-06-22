import React from 'react'
import footerbannerRectangle1 from "../assets/footerbannerRectangle1.png";
import footerbannerRectangle2 from "../assets/footerbannerRectangle2.png";
import footerbannerRectangle3 from "../assets/footerbannerRectangle3.png";
import footerbannerRectangle4 from "../assets/footerbannerRectangle4.png";
import footerbannerRectangle5 from "../assets/footerbannerRectangle5.png";
import footerimg from "../assets/image90.png";
import {BsFacebook,BsTwitter,BsLinkedin,BsYoutube} from "react-icons/bs"
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    
    <div className="footer">
    <div className="footer-img-wrapper flex">
      <div className="img-wrapper">
        <img src={footerbannerRectangle1} alt="image" />
      </div>
      <div className="img-wrapper">
        <img src={footerbannerRectangle2} alt="image" />
      </div>
      <div className="img-wrapper">
        <img src={footerbannerRectangle3} alt="image" />
      </div>
      <div className="img-wrapper">
        <img src={footerbannerRectangle5} alt="image" />
      </div>
      <div className="img-wrapper">
        <img src={footerbannerRectangle4} alt="image" />
      </div>
    </div>
    <div className="footer-navigate grid">
      <div className="img-wrapper">
        <img src={footerimg} alt="image" />
      </div>
      <div className="footer-navigate_collections">
        <div className="footer-navigate_collections-link">
          <Link>Men</Link>
          <Link>Women</Link>
          <Link>Kids</Link>
          <Link>Collections</Link>
          <Link>Trends</Link>
        </div>
        <div>Copyright Flash All Right Recovered</div>
      </div>
      <div className="footer-navigate_socialmedia">
         <BsFacebook/>
         <BsTwitter/>
         <BsLinkedin/>
         <BsYoutube/>
      </div>
    </div>
  </div>
  )
}

export default Footer