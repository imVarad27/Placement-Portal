import React, { useState } from "react";
import { Link } from "react-router-dom";

import Statistics from "./Statistics";
import Footer from "./Footer";

import "./Welcome.css";
const Welcome = () => {
  const [year, setYear] = useState("2023");
  return (
    <>
      <div className="welcome-class">
        <h3>Welcome to Placement Portal</h3>
        <div>
          <div className="dropdown">
            <button className="btn">Placement Statistics</button>
            <div className="dropdown-content">
              <Link onClick={() => setYear("2023")}>Placement 2022-23</Link>
              <Link onClick={() => setYear("2022")}>Placement 2021-22</Link>
            </div>
          </div>
        </div>
      </div>
      <Statistics value={year} />
      <Footer />
    </>
  );
};
export default Welcome;
