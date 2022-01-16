import React, { useState } from "react";
import {
  updateLocalStorage,
  createUser,
  updateProfile,
  logout,
  getUserId,
} from "./Auth";
import "./Profile.css";

function Profile() {
  const [username, setUsername] = useState(localStorage.getItem("username"));
  const [password, setPassword] = useState(localStorage.getItem("password"));
  const [name, setName] = useState(localStorage.getItem("name"));
  const [surname, setSurname] = useState(localStorage.getItem("surname"));
  const [email, setEmail] = useState(localStorage.getItem("email"));
  const [phone, setPhone] = useState(localStorage.getItem("phone"));
  const [loyalty, setLoyalty] = useState(localStorage.getItem("loyalty"));
  const id = getUserId();

  async function registerUser() {
    let user = {
      username,
      password,
      name,
      surname,
      email,
      phone,
      role: "user",
      loyalty: 0,
    };

    await createUser(user).then((res) => {
      console.log(res);
      window.location.href = "/";
    });
  }

  async function editUser() {
    let user = {
      username,
      name,
      surname,
      email,
      phone,
    };

    await updateProfile(user).then((res) => {
      console.log(res);
      updateLocalStorage(res);
      window.location.href = "/";
    });
  }

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
      {id
        ? [null]
        : [
            <label htmlFor="Password" key="1">
              Password
            </label>,
            <input
              type="password"
              id="Password"
              className="userInfo"
              onChange={(e) => setPassword(e.target.value)}
              key="2"
            ></input>,
          ]}
      <div id="names">
        <label htmlFor="Name">Name</label>
        <label htmlFor="Surname">Surname</label>
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
      <label htmlFor="Phone">Phone</label>
      <input
        type="text"
        id="Phone"
        className="userInfo"
        defaultValue={phone}
        onChange={(e) => setPhone(e.target.value)}
      ></input>
      {id
        ? [
            <label htmlFor="Points">Loyalty Points</label>,
            <div id="Points" className="userInfo">
              {loyalty}
            </div>,
          ]
        : [null]}
      <div id="profileButtons">
        {id
          ? [
              <button type="button" id="update" onClick={editUser} key="1">
                Update Profile
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
                Register
              </button>,
            ]}
      </div>
    </div>
  );
}

export default Profile;
