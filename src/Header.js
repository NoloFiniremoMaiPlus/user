import React, { useState } from "react";
import "./Header.css";
import { Link } from "react-router-dom";
import { getUser } from "./Auth";

function loginRequired() {
  alert("Devi essere loggato per vedere gli ordini");
}

function Header() {
  const [user] = useState(getUser());

  return (
    <div className="header">
      <div className="mainHeader">
        <Link to="/" className="headerLink">
          <img
            className="headerLogo"
            src="https://icons.veryicon.com/png/o/object/color-game-icon/game-controller-6.png"
            alt="logo"
          ></img>
        </Link>
        <div className="title">NoloNoloPlus</div>
        <div className="headerNav onMobileHide">
          <nav className="headerNavLinks onMobileHide">
            {user
              ? [
                  <Link to="profile" key="1">
                    <div className="headerButton onMobileHide">{user}</div>
                  </Link>,
                ]
              : [
                  <Link to="signIn" key="2">
                    <div className="headerButton onMobileHide">Login</div>
                  </Link>,
                ]}
            <Link to="/catalogue">
              <div className="headerButton onMobileHide">Catalogo</div>
            </Link>
            {user
              ? [
                  <Link to="/orders" key="1">
                    <div className="headerButton onMobileHide">Ordini</div>
                  </Link>,
                ]
              : [
                  <Link to="/" key="2" onClick={loginRequired}>
                    <div className="headerButton onMobileHide">Ordini</div>
                  </Link>,
                ]}
          </nav>
        </div>
      </div>
      <div className="secondaryHeader">
        <nav className="headerNavLinks onComputerHide">
          {user
            ? [
                <Link to="profile" key="1">
                  <div
                    className="headerButton spacePlease"
                    id="profileUnderline"
                  >
                    {user}
                  </div>
                </Link>,
              ]
            : [
                <Link to="signIn" className="headerButton spacePlease" key="2">
                  <div>Login</div>
                </Link>,
              ]}
          <Link to="/catalogue" className="headerButton spacePlease">
            Catalogo
          </Link>
          {user
            ? [
                <Link to="/orders" className="headerButton spacePlease" key="1">
                  <div>Ordini</div>
                </Link>,
              ]
            : [
                <Link
                  to="/"
                  className="headerButton spacePlease"
                  key="2"
                  onClick={loginRequired}
                >
                  <div>Ordini</div>
                </Link>,
              ]}
        </nav>
      </div>
    </div>
  );
}

export default Header;
