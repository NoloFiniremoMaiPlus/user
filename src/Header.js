import React, { useState } from "react";
import "./Header.css";
import SearchIcon from "@material-ui/icons/Search";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { Link } from "react-router-dom";
import { useStateValue } from "./StateProvider";
import {
  getToken,
  getRefreshToken,
  getExpires,
  clearLocalStorage,
  getUser,
} from "./Auth";

function Header() {
  const [{ cart }, dispatch] = useStateValue();
  const [user, setUser] = useState(getUser());

  return (
    <div className="header">
      <div className="mainHeader">
        <Link to="/" className="headerLink">
          <img
            className="headerLogo"
            src="https://icons.veryicon.com/png/o/object/color-game-icon/game-controller-6.png"
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
            onClick={console.log("clicked")}
          >
            <SearchIcon />
          </button>
        </div>
        <div className="headerNav">
          <nav className="headerNavLinks onMobileHide">
            {user
              ? [
                  <Link to="profile" key="1">
                    <div href="#" className="headerButton onMobileHide">
                      {user}
                    </div>
                  </Link>,
                ]
              : [
                  <Link to="signIn" key="2">
                    <div href="#" className="headerButton onMobileHide">
                      Login
                    </div>
                  </Link>,
                ]}
            <Link to="/catalogue">
              <div className="headerButton onMobileHide">Catalogo</div>
            </Link>
            <Link to="/orders">
              <div className="headerButton onMobileHide">Ordini</div>
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
          {user
            ? [
                <Link to="profile" key="1">
                  <div href="#" className="headerButton spacePlease">
                    {user}
                  </div>
                </Link>,
              ]
            : [
                <Link to="signIn" key="2">
                  <div href="#" className="headerButton spacePlease">
                    Login
                  </div>
                </Link>,
              ]}
          <Link to="/catalogue" className="headerButton">
            Catalogo
          </Link>
          <Link to="/orders" className="headerButton spacePlease">
            Ordini
          </Link>
        </nav>
      </div>
    </div>
  );
}

export default Header;
