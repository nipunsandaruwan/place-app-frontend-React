import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <div className="footer__box">
      <div className="footer__top">
        <div className="footer__section">
          <h3>Contact</h3>
          <p>No.69, Thelawala Rd, Mt Lavinia</p>
          <p>Tel: +94758027362 </p>
          <p>nipunsandaruwan47@gmail.com</p>
        </div>
        <div className="footer__section">
          <h4>All Users</h4>
          <h4>About Us</h4>
          <h4>Contact US</h4>
        </div>
        <div className="footer__section">
          <h1>Social Media</h1>
        </div>
      </div>
      <p className="footer__bottom">
        Copyrights © 2022 "Your Places". All Rights Reserved | Designed by Nipun
        Sandaruwan
      </p>
    </div>
  );
};

export default Footer;
