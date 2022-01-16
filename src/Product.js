import React from "react";
import "./Product.css";
import StarIcon from "@material-ui/icons/Star";
import StarBorderIcon from "@material-ui/icons/StarBorder";

function Product({ id = 0, title = "", price = 0, rating = 0, image = "" }) {
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
      <button>Add to cart</button>
    </div>
  );
}

export default Product;
