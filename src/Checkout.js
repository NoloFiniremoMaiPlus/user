import React from "react";
import "./Checkout.css";
import Subtotal from "./Subcomponents/Subtotal";
import { useStateValue } from "./StateProvider";
import CheckoutProduct from "./Subcomponents/CheckoutProduct";

function Checkout() {
  const [{ cart, user }, dispatch] = useStateValue();

  return (
    <div>
      <div className="checkout">
        <div className="checkoutCart">
          <div>
            <h3>Hello, {user?.email}</h3>
            <h2 className="checkoutTitle">Your shopping Cart</h2>
            <div className="checkoutProducts">
              {cart.map((item) => (
                <CheckoutProduct
                  id={item.id}
                  title={item.title}
                  image={item.image}
                  price={item.price}
                  rating={item.rating}
                  key={item.id}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="checkoutSubtotal">
        <Subtotal />
      </div>
    </div>
  );
}

export default Checkout;
