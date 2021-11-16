import React from "react";
import "./Header.css";
import SearchIcon from "@material-ui/icons/Search";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";

function test() {
  console.log("ciao diocan");
}

function Header() {
  return (
    <div className="header">
      <div className="mainHeader">
        <img
          className="headerLogo"
          src="http://pngimg.com/uploads/computer_pc/computer_pc_PNG7706.png"
          alt="logo"
        ></img>
        <div className="headerSearchBar">
          <input
            className="headerSearchBarInput hide-mobile-input"
            type="text"
            placeholder="Browse items"
          />
          <button
            className="headerSearchBarIcon hide-mobile-button"
            onClick={test}
          >
            <SearchIcon />
          </button>
        </div>
        <div className="headerNav">
          <nav className="headerNavLinks onMobileHide">
            <a href="#" className="headerButton onMobileHide">
              Sign In
            </a>
            <a href="#" className="headerButton onMobileHide">
              Orders
            </a>
            <a href="#" className="headerButton onMobileHide">
              Favourites
            </a>
          </nav>
          <div className="headerShoppingCart">
            <ShoppingCartIcon />
            <span className="headerShoppingCartNumber">0</span>
          </div>
        </div>
      </div>
      <div className="secondaryHeader">
        <nav className="headerNavLinks onComputerHide">
          <a href="#" className="headerButton spacePlease">
            Sign In
          </a>
          <a href="#" className="headerButton">
            Orders
          </a>
          <a href="#" className="headerButton spacePlease">
            Favourites
          </a>
        </nav>
      </div>
    </div>
  );
}

export default Header;
