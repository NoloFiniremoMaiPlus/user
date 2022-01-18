import React, { useState } from "react";
import "./Catalogue.css";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import SearchIcon from "@material-ui/icons/Search";
import {
  getCategories,
  getItems,
  getBrands,
  getStates,
  getUserId,
  localhost,
} from "./Auth";

//A function that alerts the user that they need to be logged in to view more
function loginNeeded() {
  alert("You need to be logged in to view this page");
}

function card(item) {
  return (
    <div className="itemCard" key={item.id}>
      <div className="cardImage">
        <img src={item.image} alt={item.name} />
      </div>
      <div className="cardText">
        <h2>{item.name}</h2>
        <p className="description">{item.description}</p>
        <p>
          <b>
            {item.basePrice}€ + {item.dailyPrice}€/day
          </b>
        </p>
        {getUserId() ? (
          <Link to={{ localhost } + "/item/${item.id}`"}>
            <button className="moreButton">View More</button>
          </Link>
        ) : (
          <button className="moreButton" onClick={loginNeeded}>
            Login to see more
          </button>
        )}
      </div>
    </div>
  );
}

async function appendCategories() {
  const response = await getCategories();
  let categories = response.results;
  return categories.map((category) => (
    <option key={category} value={category}>
      {category}
    </option>
  ));
}

function Catalogue() {
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [state, setState] = useState("");
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [states, setStates] = useState([]);
  const [price, setPrice] = useState(0);

  useEffect(() => {
    retrieveItems();

    getCategories().then((response) => {
      let html = [<option key="" value=""></option>];
      for (let category of response) {
        html.push(
          <option key={response.indexOf(category)} value={String(category)}>
            {String(category)}
          </option>
        );
      }
      setCategories(html);
    });
    getBrands().then((response) => {
      let html = [<option key="" value=""></option>];
      for (let brand of response) {
        html.push(
          <option key={response.indexOf(brand)} value={String(brand)}>
            {String(brand)}
          </option>
        );
      }
      setBrands(html);
    });
    getStates().then((response) => {
      let html = [<option key="" value=""></option>];
      for (const [key, value] of Object.entries(response)) {
        html.push(
          <option key={key} value={String(key)}>
            {String(value)}
          </option>
        );
      }
      setStates(html);
    });
  }, []);

  function checkItemName(item) {
    if (search === "") {
      return true;
    }
    return item.name.toLowerCase().includes(search.toLowerCase());
  }

  function checkItemFilters(item) {
    return (
      checkCategory(item) &&
      checkBrand(item) &&
      checkState(item) &&
      checkPrice(item)
    );
  }

  function checkCategory(item) {
    if (category === "") {
      return true;
    }
    return item.category.toLowerCase() === category.toLowerCase();
  }

  function checkBrand(item) {
    if (brand === "") {
      return true;
    }
    return item.brand.toLowerCase() === brand.toLowerCase();
  }

  function checkState(item) {
    if (state === "") {
      return true;
    }
    return item.state.toLowerCase() === state.toLowerCase();
  }

  function checkPrice(item) {
    console.log(price == 0);
    if (price == 0) {
      return true;
    }
    return item.basePrice + item.dailyPrice <= parseInt(price);
  }

  async function retrieveItems() {
    const response = await getItems();
    let allItems = response.results;
    setItems(allItems);
  }

  return (
    <div id="catalogue">
      <div id="catalogueContainer">
        <div className="searchBar">
          <input
            className="searchBarInput hide-mobile-input"
            type="text"
            placeholder="Browse items"
            onChange={(e) => setSearch(e.target.value)}
          />
          <button className="searchBarIcon hide-mobile-button">
            <SearchIcon />
          </button>
        </div>
        <div className="filtersContainer">
          <div className="filtersCategory filter">
            <div className="selectLabel">Category</div>
            <select
              className="filtersCategory filter"
              onChange={(e) => setCategory(e.target.value)}
            >
              {categories}
            </select>
          </div>
          <div className="filtersBrand filter">
            <div className="selectLabel">Brand</div>
            <select
              className="filtersBrand"
              onChange={(e) => setBrand(e.target.value)}
            >
              {brands}
            </select>
          </div>
          <div className="filtersState filter">
            <div className="selectLabel">State</div>
            <select
              className="filtersStateSelect"
              onChange={(e) => setState(e.target.value)}
            >
              {states}
            </select>
          </div>
          <div className="filtersPrice filter">
            <div className="selectLabel">Max Price</div>
            <input
              className="filtersPriceInput filter price"
              type="number"
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
        </div>

        <div id="catalogueProducts">
          {items.map((item) =>
            checkItemName(item) && checkItemFilters(item) ? card(item) : null
          )}
        </div>
      </div>
    </div>
  );
}

export default Catalogue;
