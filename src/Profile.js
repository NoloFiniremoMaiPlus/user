import React, { useState, useEffect } from "react";
import {
  updateLocalStorage,
  createUser,
  updateProfile,
  logout,
  getUserId,
  getUserById,
} from "./Auth";
import "./Profile.css";

function Profile() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [loyalty, setLoyalty] = useState(0);
  const id = getUserId();

  async function retrieveUser(id) {
    let user = await getUserById(id);
    setUsername(user.username);
    setPassword(user.password);
    setName(user.name);
    setSurname(user.surname);
    setEmail(user.email);
    setPhone(user.phone);
    setLoyalty(user.loyalty);
  }

  async function registerUser() {
    let user = {
      username,
      password,
      name,
      surname,
      email,
      phone,
    };

    await createUser(user).then((res) => {
      console.log(res);
      if (res.code) {
        alert(res.message);
      } else {
        window.location.href = "/";
      }
    });
  }

  async function editUser() {
    let user = {
      username,
      password,
      name,
      surname,
      email,
      phone,
    };

    await updateProfile(user).then((res) => {
      updateLocalStorage(res);
      window.location.href = "/";
    });
  }

  useEffect(() => {
    retrieveUser(getUserId());
  }, []);

  return (
    <div id="profileContainer">
      <h1>Your Profile</h1>
      <label htmlFor="Username">Username</label>
      <input
        id="Username"
        className="userInfo"
        defaultValue={username}
        onChange={(e) => setUsername(e.target.value)}
      ></input>
      <label htmlFor="Password" key="1">
        Password
      </label>
      <input
        type="password"
        id="Password"
        className="userInfo"
        onChange={(e) => setPassword(e.target.value)}
        key="2"
      ></input>
      <div id="names">
        <label htmlFor="Name" key="0">
          Nome
        </label>
        <label htmlFor="Surname" key="1">
          Cognome
        </label>
      </div>
      <div id="Anagraphic">
        <input
          id="Name"
          className="userInfo"
          defaultValue={name}
          onChange={(e) => setName(e.target.value)}
        ></input>
        <input
          id="Surname"
          className="userInfo"
          defaultValue={surname}
          onChange={(e) => setSurname(e.target.value)}
        ></input>
      </div>
      <label htmlFor="Email">Email</label>
      <input
        id="Email"
        className="userInfo"
        defaultValue={email}
        onChange={(e) => setEmail(e.target.value)}
      ></input>
      <label htmlFor="Phone">Telefono</label>
      <input
        type="text"
        id="Phone"
        className="userInfo"
        defaultValue={phone}
        onChange={(e) => setPhone(e.target.value)}
      ></input>
      {id
        ? [
            <label htmlFor="Points" key="0">
              Punti Fedeltà
            </label>,
            <div id="Points" className="userInfo" key="1">
              {loyalty}
            </div>,
          ]
        : [null]}
      <div id="profileButtons">
        {id
          ? [
              <button type="button" id="update" onClick={editUser} key="1">
                Aggiorna Profilo
              </button>,
              <button type="button" id="logout" onClick={logout} key="2">
                Logout
              </button>,
            ]
          : [
              <button
                type="button"
                id="register"
                onClick={registerUser}
                key="3"
              >
                Registrati
              </button>,
            ]}
      </div>
    </div>
  );
}

export default Profile;
