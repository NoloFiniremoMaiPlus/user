import React from "react";
import "./Product.css";
import StarIcon from "@material-ui/icons/Star";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import { useStateValue } from "../StateProvider";

function Product({ id = 0, title = "", price = 0, rating = 0, image = "" }) {
  const [{ cart }, dispatch] = useStateValue();

  const addToCart = () => {
    //Dispatch the item into the data layer
    dispatch({
      type: "ADD_TO_CART",
      item: {
        id: id,
        title: title,
        image: image,
        price: price,
        rating: rating,
      },
    });
  };

  var emptyStars = 5 - rating;
  return (
    <div className="product">
      <p className="productTitle">{title} </p>
      <p className="productPrice">{price}€</p>
      <p className="productRating">
        {Array(rating)
          .fill()
          .map((_, i) => (
            <StarIcon key={i} />
          ))}
        {Array(emptyStars)
          .fill()
          .map((_, i) => (
            <StarBorderIcon key={i} />
          ))}
      </p>
      <img src={image} alt="product" />
      <button onClick={addToCart}>Add to cart</button>
    </div>
  );
}

export default Product;
