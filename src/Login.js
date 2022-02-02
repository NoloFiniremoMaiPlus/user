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
        <h1>Benvenuto</h1>
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
            Log In
          </button>

          <Link to="/profile">
            <div className="signButton" id="loginRegisterButton">
              Crea un account
            </div>
          </Link>
        </form>

        <p>
          Registrandoti accetti la nostra politica aziendale, totalmente
          invasiva e che non mette l'utente al primo posto. Attenzione, una
          volta registrato non puoi più tornare indietro.
        </p>
      </div>
    </div>
  );
}

export default Login;
