import React, { useState } from "react";
import { updateLocalStorage, updateProfile, logout } from "./Auth";
import "./Profile.css";

function Profile() {
  const [username, setUsername] = useState(localStorage.getItem("username"));
  const [name, setName] = useState(localStorage.getItem("name"));
  const [surname, setSurname] = useState(localStorage.getItem("surname"));
  const [email, setEmail] = useState(localStorage.getItem("email"));
  const [phone, setPhone] = useState(localStorage.getItem("phone"));
  const [loyalty, setLoyalty] = useState(localStorage.getItem("loyalty"));

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
      <label htmlFor="Points">Loyalty Points</label>
      <div id="Points" className="userInfo">
        {loyalty}
      </div>
      <div id="profileButtons">
        <button type="button" id="update" onClick={editUser}>
          Update Profile
        </button>
        <button type="button" id="logout" onClick={logout}>
          Logout
        </button>
      </div>
    </div>
  );
}

export default Profile;
