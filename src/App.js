import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Main from "./Main";
import Header from "./Header";
import Orders from "./Orders";
import Login from "./Login";
import Profile from "./Profile";
import Catalogue from "./Catalogue";

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route exact path="/signIn" element={<Login />}></Route>
          <Route path="/profile" element={<Profile />}></Route>
          <Route exact path="/orders" element={<Orders />}></Route>
          <Route exact path="/catalogue" element={<Catalogue />}></Route>
          <Route exact path="/" element={<Main />}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
