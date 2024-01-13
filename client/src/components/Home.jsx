import React from "react";
import "./Home.css";

const Home = () => {
  return (
    <main className="main-img">
      <div className="content-container">
        <h1 className="heading">Welcome to the Placement Portal</h1>
        <p className="sub-text">
          Explore opportunities and kickstart your career!
        </p>
        <img
          className="img-class"
          src="src\assets\placementImg.svg"
          alt="Placement Image"
        />
      </div>
      <footer className="footer">
        <div className="footer-content">
          <div className="contact-us">
            <h2>Contact Us</h2>
            <p>Email: dktestextile@gmail.com</p>
            <p>Phone: (0230) 2432340</p>
          </div>
          <div className="additional-info">
            <h2>Additional Information</h2>
            <p>Privacy Policy</p>
            <p>Terms of Service</p>
          </div>
        </div>
        <div className="social-media">
          <h2>Follow Us</h2>
          <div className="social-icons">
            <a
              href="https://www.facebook.com/dktestei/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-facebook"></i>
            </a>
            <a
              href="https://www.linkedin.com/school/dkte/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-linkedin"></i>
            </a>
            <a
              href="https://twitter.com/dktestei"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-twitter"></i>
            </a>
            <a
              href="https://www.instagram.com/dkte_tei/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-instagram"></i>
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
};

export default Home;
