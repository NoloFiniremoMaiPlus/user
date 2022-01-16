import React, { useState } from "react";
import "./Header.css";
import SearchIcon from "@material-ui/icons/Search";
import { Link } from "react-router-dom";
import { getUser } from "./Auth";

function Header() {
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
        <div className="headerSearchBar">NoloNolo Plus</div>
        {/* <div className="title">NoloNoloPlus</div> */}
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
