import React, { useState, useEffect } from "react";
import { getItem, getUserId, getUserById, status, postRental } from "./Auth";
import "./Item.css";
import DatePicker from "react-datepicker/dist/react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useParams } from "react-router-dom";

function getTomorrowDate() {
  let date = new Date();
  date.setDate(date.getDate() + 1);
  return date;
}

function Item() {
  const [item, setItem] = useState(null);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(getTomorrowDate());
  const [unavaiableDates, setUnavaiableDates] = useState([]);
  const [estimated, setEstimated] = useState(false);
  const [basePrice, setBasePrice] = useState(0);
  const [totalDiscount, setTotalDiscount] = useState(0);
  const [loyalty, setLoyalty] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  const { id } = useParams();

  async function retrieveItem(id) {
    let gotItem = await getItem(id);
    setItem(gotItem);
    createUnavaiableDatesRange(gotItem);
  }

  async function retrieveLoyalty(id) {
    let user = await getUserById(id);
    setLoyalty(user.loyalty);
  }

  function createUnavaiableDatesRange(item) {
    let dateRanges = [];
    let unavailableDatesRanges = item.unavailable;
    unavailableDatesRanges.forEach((dateRange) => {
      let startDate = new Date(dateRange.from.slice(0, 10));
      let endDate = new Date(dateRange.to.slice(0, 10));
      while (startDate <= endDate) {
        dateRanges.push(new Date(startDate));
        startDate.setDate(startDate.getDate() + 1);
      }
    });
    setUnavaiableDates(dateRanges);
  }

  async function showEstimate() {
    if (endDate < startDate) {
      alert(
        "La data di fine noleggio non può essere precedente alla data di inizio noleggio"
      );
      return;
    }
    let estimate = await postRental(item.id, startDate, endDate, loyalty, true);
    if (estimate.code) {
      alert(estimate.message);
    } else {
      console.log(estimate);
      setEstimated(true);
      setBasePrice(estimate.base);
      setTotalPrice(estimate.total);
      setTotalDiscount(Math.max(estimate.base - estimate.total, 0));
    }
  }

  async function sendRental() {
    await postRental(item.id, startDate, endDate, loyalty, false);
    window.location.href = "/";
  }

  useEffect(() => {
    let userID = getUserId();
    retrieveLoyalty(userID);
    retrieveItem(id);
  }, []);

  return item ? (
    [
      <div className="wholeItemCard" key={item.id}>
        <div className="itemContainer" key="1">
          <h1>{item.name}</h1>
          <img src={item.image} alt={item.name} />
          <div className="description">
            <p>{item.description}</p>
          </div>
          <div className="itemRow">
            <p className="label">Categoria:</p>
            <p>{item.category}</p>
          </div>
          <div className="itemRow">
            <p className="label">Marca:</p>
            <p>{item.brand}</p>
          </div>
          <div className="itemRow">
            <p className="label">Stato:</p>
            <p>{status[item.state]}</p>
          </div>
          <div className="itemRow">
            <p className="label">Prezzo:</p>
            <p>
              {item.basePrice}€ + {item.dailyPrice}€/giorno
            </p>
          </div>
          {item.discount > 0 ?
            <div className="itemRow">
              <p className="label">Sconto:</p>
              <p>{item.discount}%</p>
            </div>
          : ""}
        </div>
        <div id="datesContainer" className="dates">
          <div className="datesRow">
            <p className="dateLabel">Data di inizio:</p>
            <DatePicker
              id="startDate"
              className="datePicker"
              dateFormat="dd/MM/yyyy"
              timeFormat={false}
              closeOnSelect
              onChange={(date) => {
                let newDate = new Date(date);
                setStartDate(date);
                newDate.setDate(newDate.getDate() + 1);
                setEndDate(newDate);
              }}
              selected={startDate}
              excludeDates={unavaiableDates}
              popperPlacement="bottom"
              disabled={estimated ? true : false}
            />
          </div>
          <div className="datesRow">
            <p className="dateLabel">Data di fine:</p>
            <DatePicker
              id="endDate"
              className="datePicker"
              dateFormat="dd/MM/yyyy"
              timeFormat={false}
              closeOnSelect
              onChange={(date) => setEndDate(date)}
              selected={endDate}
              excludeDates={unavaiableDates}
              popperPlacement="bottom"
              disabled={estimated ? true : false}
            />
          </div>
        </div>
        <div className="loyaltyRow">
          <p className="loyaltyLabel">Punti fedeltà usati:</p>
          <input
            type="number"
            id="loyalty"
            className="loyaltyInput"
            onChange={(e) => setLoyalty(e.target.value)}
            disabled={estimated ? true : false}
            value={loyalty}
            min="0"
            max={loyalty}
          />
        </div>
        {estimated
          ? [
              <div className="estimateBlock" key="1">
                <p>
                  Prezzo Base:
                  <span>{basePrice.toFixed(2)}€</span>
                </p>
                <div>
                  <p>
                    Sconto totale applicato:
                    <span>{totalDiscount.toFixed(2)}€</span>
                  </p>
                </div>
                <div>
                  <p>
                    Prezzo totale:
                    <span>{totalPrice.toFixed(2)}€</span>
                  </p>
                </div>

                <button className="button" onClick={sendRental}>
                  Prenota
                </button>
              </div>,
            ]
          : [
              <button
                key="2"
                className="button"
                onClick={() => {
                  showEstimate(item, startDate, endDate);
                }}
              >
                Preventivo
              </button>,
            ]}
      </div>,
    ]
  ) : (
    <div key="2">Caricamento...</div>
  );
}

export default Item;
