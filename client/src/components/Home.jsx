import React, { useState, useEffect } from "react";
import "./Home.css";
//import React, { useEffect } from "react";
//import "owl.carousel/dist/assets/owl.carousel.css";
//import "owl.carousel/dist/assets/owl.theme.default.css";
//import $ from "jquery";

const Home = () => {
  const images = [
    "https://www.dkte.ac.in/media/k2/items/cache/3899dfe821816fbcb3db3e3b23f81585_S.jpg",
    "https://www.dkte.ac.in/media/k2/items/cache/1379b5de7cb668c186ab48a9361eabd7_S.jpg",
    "https://www.dkte.ac.in/media/k2/items/cache/48ee1e8a0a8f50dce4f8cb9ab418e211_S.jpg",
    "https://www.dkte.ac.in/media/k2/items/cache/475699d297afae315ef802312426354e_S.jpg",
    "https://www.dkte.ac.in/media/k2/items/cache/e67ec824afbc9f855ad850f1b49c5b05_S.jpg",
    "https://www.dkte.ac.in/media/k2/items/cache/78a38d90a5f5af5857b8e93fa4dd5a84_S.jpg",
    "https://www.dkte.ac.in/media/k2/items/cache/d61d44254608dd06ccdd2ff02982d14d_S.jpg",
    "https://www.dkte.ac.in/media/k2/items/cache/e7b279be6a862d254f0e7cc4dde2874e_S.jpg",
    "https://www.dkte.ac.in/media/k2/items/cache/e31ace2a15a7c70645ad83df9ecd43b0_S.jpg",
    "https://www.dkte.ac.in/media/k2/items/cache/8e5f062e9750688c028aaa3058da9ec4_S.jpg",
    "https://www.dkte.ac.in/media/k2/items/cache/c82cc4e14a1d2c8c8ffff9840d24b558_S.jpg",
    // Add more image URLs as needed
  ];
  const [currentIndex, setCurrentIndex] = useState(0);
  const changeSlide = (direction) => {
    const totalSlides = Math.ceil(images.length / 4);
    const newIndex = (currentIndex + direction + totalSlides) % totalSlides;
    setCurrentIndex(newIndex);
  };
  useEffect(() => {
    const intervalId = setInterval(() => {
      changeSlide(1);
    }, 3000); // Adjust the interval time as needed (e.g., 3000 milliseconds or 3 seconds)

    return () => clearInterval(intervalId); // Cleanup the interval on component unmount
  }, [currentIndex]);
  return (
    <main className="main-img">
      <div className="content-container">
        <h1 className="heading">Welcome to the Placement Portal</h1>
        <p className="sub-text">OUR PLACEMENTS</p>
        <div style={{ position: "relative", overflow: "hidden" }}>
          <div
            className="Placementsbox-container"
            style={{
              display: "flex",
              transition: "transform 0.5s ease",
              transform: `translateX(-${currentIndex * 100}%)`,
            }}
          >
            {images.map((imageUrl, index) => (
              <div key={index} style={{ flex: "0 0 25%", maxWidth: "25%" }}>
                <img
                  src={imageUrl}
                  alt={`Slide ${index + 1}`}
                  style={{ width: "70%", height: "auto", marginTop: "50px" }}
                />
              </div>
            ))}
          </div>
        </div>
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
