import React from "react";
import "./CheckoutProduct.css";
import StarIcon from "@material-ui/icons/Star";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import { useStateValue } from "../StateProvider";

function CheckoutProduct({
  id = 0,
  title = "",
  price = 0,
  rating = 0,
  image = "",
  hideButton,
}) {
  var emptyStars = 5 - rating;
  const [{ cart }, dispatch] = useStateValue();

  const removeFromCart = () => {
    // remove the item from the Cart
    dispatch({
      type: "REMOVE_FROM_CART",
      id: id,
    });
  };

  return (
    <div className="checkoutProduct">
      <p className="checkoutProductTitle">{title}</p>
      <p className="checkoutProductPrice">{price}€</p>
      <p className="checkoutProductRating">
        {Array(rating)
          .fill()
          .map((_, i) => (
            <StarIcon />
          ))}
        {Array(emptyStars)
          .fill()
          .map((_, i) => (
            <StarBorderIcon />
          ))}
      </p>
      <img src={image} alt="checkoutProduct" />
      {!hideButton && (
        <button onClick={removeFromCart}>Remove from Cart</button>
      )}
    </div>
  );
}

export default CheckoutProduct;
