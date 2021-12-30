import React, { useState } from "react";
import "./Login.css";
import { Link, useHistory } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="login">
      <div className="loginContainer">
        <h1>Sign-in</h1>

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

          <button type="submit" className="loginSignInButton">
            Sign In
          </button>
        </form>

        <button className="loginRegisterButton">Create your Account</button>

        <p>
          By signing-in you agree to ours uber oppressive Conditions of Use &
          Sale. Please see our Privacy Notice, our Cookies Notice and our
          Interest-Based Ads Notice because after you sign there's no way back.
        </p>
      </div>
    </div>
  );
}

export default Login;
