import React, { useState } from "react";
import "./Catalogue.css";
import { Link } from "react-router-dom";
import { getItems } from "./Auth";
import { useEffect } from "react";

function card(item) {
  return (
    <div className="itemCard" key={item.id}>
      <div className="cardImage">
        <img src={item.image} alt={item.name} />
      </div>
      <div className="cardText">
        <h2>{item.name}</h2>
        <p>{item.description}</p>
        <p>
          <b>
            {item.basePrice}€ + {item.dailyPrice}€/day
          </b>
        </p>
        <button>View More</button>
      </div>
    </div>
  );
}

function Catalogue() {
  const [items, setItems] = useState([]);

  async function retrieveItems() {
    const response = await getItems();
    let allItems = response.results;
    setItems(allItems);
  }

  useEffect(() => {
    retrieveItems();
  }, []);

  return (
    <div id="catalogue">
      <div id="catalogueContainer">
        <h1>Catalogo</h1>
        <div id="catalogueProducts">{items.map((item) => card(item))}</div>
      </div>
    </div>
  );
}

export default Catalogue;
