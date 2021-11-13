import React from "react";
import "./Header.css";

function Header() {
  return (
    <div className="header">
      <img
        className="headerLogo"
        src="http://pngimg.com/uploads/computer_pc/computer_pc_PNG7706.png"
      ></img>
      <div className="headerSearchBar">
        <input
          className="headerSearchBarInput"
          type="text"
          placeholder="Search for a station"
        ></input>
      </div>
      <div className="headerNav">
        <div className="headerButton">
          <span className="headerButtonFirstLine">Hello Customer</span>
          <span className="headerButtonSecondLine">Sign In</span>
        </div>
        <div className="headerButton">
          <span className="headerButtonFirstLine">Returns &</span>
          <span className="headerButtonSecondLine">Orders</span>
        </div>
        <div className="headerButton">
          <span className="headerButtonFirstLine">Check out your</span>
          <span className="headerButtonSecondLine">Favourites</span>
        </div>
      </div>
    </div>
  );
}

export default Header;
