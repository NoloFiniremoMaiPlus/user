import React from "react";
import "./Main.css";
import Product from "./Product";

function Main() {
  return (
    <div className="main">
      <div className="mainContainer">
        <img
          className="mainImage"
          src="https://pngimg.com/uploads/gamepad/gamepad_PNG12.png"
          alt="banner gradient img"
        />
      </div>
      <div className="row">
        <Product
          title="Prova 1"
          rating={3}
          price={30}
          image="https://pngimg.com/uploads/gamepad/gamepad_PNG12.png"
        />
      </div>
      <div className="row">
        <Product
          title="Prova 1"
          rating={3}
          price={30}
          image="https://pngimg.com/uploads/gamepad/gamepad_PNG12.png"
        />
        <Product
          title="Prova 1"
          rating={3}
          price={30}
          image="https://pngimg.com/uploads/gamepad/gamepad_PNG12.png"
        />
        <Product
          title="Prova 1"
          rating={3}
          price={30}
          image="https://pngimg.com/uploads/gamepad/gamepad_PNG12.png"
        />
      </div>
      <div className="row">
        <Product
          title="Prova 1"
          rating={3}
          price={30}
          image="https://pngimg.com/uploads/gamepad/gamepad_PNG12.png"
        />
        <Product
          title="Prova 1"
          rating={3}
          price={30}
          image="https://pngimg.com/uploads/gamepad/gamepad_PNG12.png"
        />
      </div>
    </div>
  );
}

export default Main;
