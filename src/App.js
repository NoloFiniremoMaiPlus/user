import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Main from "./Main";
import Checkout from "./Checkout";
import Header from "./Header";

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route exact path="/checkout" element={<Checkout />}></Route>
          <Route exact path="/" element={<Main />}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
