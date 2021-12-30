import React from "react";
import "./Header.css";
import SearchIcon from "@material-ui/icons/Search";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { Link } from "react-router-dom";
import { useStateValue } from "./StateProvider";

function test() {
  console.log("ciao diocan");
}

function Header() {
  const [{ cart }, dispatch] = useStateValue();
  return (
    <div className="header">
      <div className="mainHeader">
        <Link to="/" className="headerLink">
          <img
            className="headerLogo"
            src="http://pngimg.com/uploads/computer_pc/computer_pc_PNG7706.png"
            alt="logo"
          ></img>{" "}
        </Link>
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
            <Link to="SignIn">
              <div href="#" className="headerButton onMobileHide">
                Sign In
              </div>
            </Link>
            <Link to="/orders">
              <div className="headerButton onMobileHide">Orders</div>
            </Link>
            <Link to="/favourites">
              <div className="headerButton onMobileHide">Favourites</div>
            </Link>
          </nav>
          <Link to="/checkout">
            <div className="headerShoppingCart">
              <ShoppingCartIcon />
              <span className="headerShoppingCartNumber">{cart?.length}</span>
            </div>
          </Link>
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
