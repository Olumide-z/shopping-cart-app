import React from "react";
import { Card, Button } from "react-bootstrap";
import { CartState } from "../contexts/Context";
import Rating from "./Rating";

const SingleProduct = ({ item }) => {
  const {
    state: { cart },
    dispatch,
  } = CartState();

  // console.log(cart);
  return (
    <div className="products">
      <Card>
        <Card.Img variant="top" src={item.images} alt={item.product} />
        <Card.Body>
          <Card.Title>{item.product}</Card.Title>
          <Card.Subtitle style={{ paddingBottom: 10 }}>
            <span>${item.price.split(".")[0]}</span>
            {item.fastDelivery ? (
              <div>Fast Delivery</div>
            ) : (
              <div>4 days delivery</div>
            )}
            <Rating rating={item.ratings} />
          </Card.Subtitle>
          {
            // some helps us check if that particular thing exist inside the array or not
            cart.some((product) => product.id === item.id) ? (
              <Button
                variant="danger"
                onClick={() => {
                  dispatch({
                    type: "REMOVE_FROM_CART",
                    payload: item,
                  });
                }}
              >
                Remove from cart
              </Button>
            ) : (
              <Button
                disabled={!item.inStock}
                onClick={() => {
                  dispatch({
                    type: "ADD_TO_CART",
                    payload: item,
                  });
                }}
              >
                {!item.inStock ? "Out of Stock" : "Add to Cart"}
              </Button>
            )
          }
        </Card.Body>
      </Card>
    </div>
  );
};

export default SingleProduct;
