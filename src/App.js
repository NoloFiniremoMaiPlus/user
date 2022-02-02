import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Main from "./Main";
import Header from "./Header";
import Orders from "./Orders";
import Login from "./Login";
import Profile from "./Profile";
import Catalogue from "./Catalogue";
import Item from "./Item";

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route exact path="/signIn" element={<Login />}></Route>
          <Route exact path="/profile" element={<Profile />}></Route>
          <Route exact path="/orders" element={<Orders />}></Route>
          <Route exact path="/catalogue" element={<Catalogue />}></Route>
          <Route path="/item/:id" element={<Item />}></Route>
          <Route exact path="/" element={<Main />}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
