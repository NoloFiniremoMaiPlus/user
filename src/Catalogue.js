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
  searchBestItem,
} from "./Auth";

//A function that alerts the user that they need to be logged in to view more
function loginNeeded() {
  alert("Devi essere loggato per vedere questa pagina");
}

function card(item) {
  let id = item.id;
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
          <Link to={`/item/${id}`} key="0">
            <button className="moreButton">View More</button>
          </Link>
        ) : (
          <button className="moreButton" onClick={loginNeeded} key="1">
            Login per vedere di più
          </button>
        )}
      </div>
    </div>
  );
}

function Catalogue() {
  const [items, setItems] = useState([]);
  const [singleItem, setSingleItem] = useState(null);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [state, setState] = useState("");
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [states, setStates] = useState([]);
  const [price, setPrice] = useState(0);

  function loggedUserCatalogue() {
    retrieveItems(getUserId());

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
  }

  async function searchItem() {
    let item = await searchBestItem(category);
    setSingleItem(item.results[0]);
  }

  function loadCategories() {
    getCategories().then((response) => {
      let html = [];
      setCategory(response[0]);
      for (let category of response) {
        html.push(
          <option key={response.indexOf(category)} value={String(category)}>
            {String(category)}
          </option>
        );
      }
      setCategories(html);
    });
  }

  useEffect(() => {
    if (getUserId()) loggedUserCatalogue();
    else {
      loadCategories();
    }
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
      checkPrice(item) &&
      checkEnabled(item)
    );
  }

  function checkEnabled(item) {
    return item.enabled;
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
    if (price === 0) {
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
        {getUserId()
          ? [
              <div className="searchBar">
                <input
                  className="searchBarInput hide-mobile-input"
                  type="text"
                  placeholder="Filtra oggetti"
                  onChange={(e) => setSearch(e.target.value)}
                />
                <button className="searchBarIcon hide-mobile-button">
                  <SearchIcon />
                </button>
              </div>,
            ]
          : null}

        <div className="filtersContainer">
          <div className="filtersCategory filter">
            <div className="selectLabel">Categoria</div>
            <select
              className="filtersCategory filter"
              onChange={(e) => setCategory(e.target.value)}
            >
              {categories}
            </select>
          </div>
          {getUserId()
            ? [
                <div className="filtersBrand filter" key="0">
                  <div className="selectLabel">Brand</div>
                  <select
                    className="filtersBrand"
                    onChange={(e) => setBrand(e.target.value)}
                  >
                    {brands}
                  </select>
                </div>,
              ]
            : null}
          {getUserId()
            ? [
                <div className="filtersState filter" key="1">
                  <div className="selectLabel">Stato</div>
                  <select
                    className="filtersStateSelect"
                    onChange={(e) => setState(e.target.value)}
                  >
                    {states}
                  </select>
                </div>,
              ]
            : null}
          {getUserId()
            ? [
                <div className="filtersPrice filter" key="2">
                  <div className="selectLabel">Prezzo Massimo</div>
                  <input
                    className="filtersPriceInput filter price"
                    type="number"
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </div>,
              ]
            : null}
          <div id="catalogueProducts">
            {items.length > 0 ? (
              [
                items.map((item) =>
                  checkItemName(item) && checkItemFilters(item)
                    ? card(item)
                    : null
                ),
              ]
            ) : singleItem ? (
              <div className="catalogueItem">
                {card(singleItem)}
                <button id="searchButton" onClick={searchItem} key="3">
                  Cerca miglior offerta
                </button>
              </div>
            ) : (
              <button id="searchButton" onClick={searchItem} key="3">
                Cerca miglior offerta
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Catalogue;
