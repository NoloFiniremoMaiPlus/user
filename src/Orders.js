import React from "react";
import "./Orders.css";
import Product from "./Product";

function Orders() {
  return (
    <div>
      <div className="orders">
        <h3>Hello, </h3>
        <h2 className="ordersTitle">These are your orders</h2>
        <div className="ordersProducts">
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

export default Orders;
