import React from "react";
import Styles from "./Announcement.module.css";
const Announcement = () => {
  return (
    <div className={`marginleft ${Styles["announcement-container"]}`}>
      <span className={`${Styles["announcement-title"]}`}>
        <i className="fa-solid fa-bullhorn "></i>
        <h3>Announcement</h3>
      </span>
    </div>
  );
};

export default Announcement;
