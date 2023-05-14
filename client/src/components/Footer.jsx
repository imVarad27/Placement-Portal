import React from "react";
import css from "./Footer.module.css";
const Footer = () => {
  return (
    <footer className={css["footer"]}>
      <div className={css["footer-content"]}>
        <h3>49</h3>
        <h4>Pre Placement Offers</h4>
      </div>
      <div className={css["footer-content"]}>
        <h3>100+</h3>
        <h4>Companies Visited</h4>
      </div>
      <div className={css["footer-content"]}>
        <h3>100%</h3>
        <h4>Placement of Textile Students</h4>
      </div>
    </footer>
  );
};

export default Footer;
