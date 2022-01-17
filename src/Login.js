import React, { useState } from "react";
import "./Login.css";
import { Link } from "react-router-dom";
import { saveToLocalStorage, loginUser } from "./Auth";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [failedLogin, setFailedLogin] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await loginUser({
      email,
      password,
    }).then((res) => {
      if (res.tokens && res.user) {
        saveToLocalStorage(res);
        window.location.href = "/";
      } else {
        setFailedLogin(true);
        setEmail("");
        setPassword("");
      }
    });
  };

  return (
    <div className="login">
      <div className="loginContainer">
        <h1>Welcome</h1>
        {failedLogin ? <h3>Email e/o Password errate. Riprova!</h3> : null}
        <form>
          <h5>E-mail</h5>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <h5>Password</h5>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="button"
            className="signButton"
            id="loginSignInButton"
            onClick={handleSubmit}
          >
            Sign In
          </button>

          <Link to="/profile">
            <div className="signButton" id="loginRegisterButton">
              Create your Account
            </div>
          </Link>
        </form>

        <p>
          By signing-in you agree to our uber oppressive Conditions of Use &
          Sale. Please see our Privacy Notice, because after you sign there's no
          way back.
        </p>
      </div>
    </div>
  );
}

export default Login;
