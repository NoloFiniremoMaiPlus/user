import React from "react";
import "./Favourites.css";
import { useStateValue } from "./StateProvider";
import Product from "./Subcomponents/Product";

function Favourites() {
  const [{ cart, user }, dispatch] = useStateValue();

  return (
    <div>
      <div className="favourites">
        <h3>Hello, {user?.email}</h3>
        <h2 className="favouritesTitle">These are your favourite items</h2>
        <div className="favouritesProducts">
          <Product
            id="123"
            title="Prova 2"
            rating={3}
            price={30}
            image="https://pngimg.com/uploads/gamepad/gamepad_PNG12.png"
          />
          <Product
            id="123"
            title="Prova 2"
            rating={3}
            price={30}
            image="https://pngimg.com/uploads/gamepad/gamepad_PNG12.png"
          />
          <Product
            id="123"
            title="Prova 2"
            rating={3}
            price={30}
            image="https://pngimg.com/uploads/gamepad/gamepad_PNG12.png"
          />
        </div>
      </div>
    </div>
  );
}

export default Favourites;
