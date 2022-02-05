import React, { useState, useEffect } from "react";
import "./Orders.css";
import { getOrders, getUserId, rentStatus, deleteOrder } from "./Auth";

function daysDistance(from, to) {
  if (!to) return 0;
  const date1 = new Date(from);
  const date2 = new Date(to);
  const timeDiff = Math.abs(date2.getTime() - date1.getTime());
  const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
  return diffDays === 0 ? diffDays : diffDays + 1;
}

function parseDate(date) {
  return date ? date.slice(0, 10) : "";
}

function getTotalDiscount(order) {
  return order.base - order.total - order.loyalty;
}

function Orders() {
  const [orders, setOrders] = useState([]);
  const [showInvoice, setShowInvoice] = useState(false);
  const [showedInvoice, setShowedOrder] = useState(null);

  async function removeOrder(id) {
    await deleteOrder(id);
    window.location.href = "/";
  }

  function invoiceCard(order) {
    return (
      <div className="invoiceCard" index={orders.indexOf(order)}>
        <div className="invoiceRow">
          <div>
            <b>Oggetto:</b>
          </div>
          <div>{order.item ? order.item.name : null}</div>
        </div>
        <div className="invoiceRow">
          <div>
            <b>Dal:</b>
          </div>
          <div>{parseDate(order.from)}</div>
        </div>
        <div className="invoiceRow">
          <div>
            <b>Al:</b>
          </div>
          <div>{parseDate(order.to)}</div>
        </div>
        <div className="invoiceRow">
          <div>
            <b>Ritornato il:</b>
          </div>
          <div>{order.return ? parseDate(order.return) : "TBD"}</div>
        </div>
        <div className="invoiceRow">
          <div>
            <b>Durata Noleggio:</b>
          </div>
          <div>{daysDistance(order.from, order.to)}</div>
        </div>
        <div className="invoiceRow">
          <div>
            <b>Giorni di Ritardo:</b>
          </div>
          <div>{daysDistance(order.to, order.return)}</div>
        </div>
        <div className="invoiceRow">
          <div>
            <b>Prezzo Base:</b>
          </div>
          <div>{order.base}</div>
        </div>
        <div className="invoiceRow">
          <div>
            <b>Punti Usati:</b>
          </div>
          <div>{order.loyalty}</div>
        </div>
        <div className="invoiceRow">
          <div>
            <b>Sconto Totale:</b>
          </div>
          <div>{getTotalDiscount(order)}</div>
        </div>
        <div className="invoiceRow">
          <div>
            <b>Sovrapprezzo:</b>
          </div>
          <div>{order.surcharge}</div>
        </div>
        <div className="invoiceRow">
          <div>
            <b>Prezzo Totale:</b>
          </div>
          <div>{order.total}</div>
        </div>
        <div className="buttons">
          <button
            className="printButton"
            onClick={() => {
              alert("Printing invoice...");
            }}
          >
            Print
          </button>
          <button
            className="goBackButton"
            onClick={() => {
              setShowInvoice(false);
              setShowedOrder(null);
            }}
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  function orderCard(order, index) {
    return order
      ? [
          <div className="orderCard" key={index}>
            <div className="orderCard-header">
              <h2>Ordine #{order.id}</h2>
            </div>
            <div className="orderCard-body">
              <div className="row">
                <label htmlFor="productName">Oggetto:</label>
                <div>{order.item ? order.item.name : null}</div>
              </div>
              <div className="row">
                <label htmlFor="dateFrom">Dal:</label>
                <div>{parseDate(order.from)}</div>
              </div>
              <div className="row">
                <label htmlFor="dateTo">Al:</label>
                <div>{parseDate(order.to)}</div>
              </div>
              <div className="row">
                <label htmlFor="dateReturn">Ritornato il:</label>
                <div>{order.return ? parseDate(order.return) : "TBD"}</div>
              </div>
              <div className="row">
                <label htmlFor="totalCost">Costo Totale:</label>
                <div>{order.total}</div>
              </div>
              <div className="row">
                <label htmlFor="state">Stato Noleggio:</label>
                <div>{rentStatus[order.state]}</div>
              </div>
              {order.state === "Booked"
                ? [
                    <button
                      className="cancelButton"
                      onClick={() => {
                        removeOrder(order.id);
                      }}
                      key="1"
                    >
                      Cancel Order
                    </button>,
                  ]
                : null}
              {order.state === "Returned"
                ? [
                    <button
                      className="invoiceButton"
                      onClick={() => {
                        setShowInvoice(true);
                        setShowedOrder(order);
                      }}
                      key="1"
                    >
                      Get invoice
                    </button>,
                  ]
                : null}
            </div>
          </div>,
        ]
      : null;
  }

  async function addOrders() {
    const response = await getOrders(getUserId());
    let orders = response.results;
    setOrders(orders);
  }

  useEffect(() => {
    addOrders();
  }, []);

  return (
    <div>
      <div className="orders">
        {showInvoice ? [<h1 key="0">Fattura</h1>] : [<h1 key="1">Ordini</h1>]}

        {showInvoice
          ? invoiceCard(showedInvoice)
          : [
              <div className="orders-container" key="1">
                {orders.map((order, index) => orderCard(order, index))}
              </div>,
            ]}
      </div>
    </div>
  );
}

export default Orders;
