import React, { useEffect, useState } from "react";
import { ListGroup, Button, Row, Col, Image, Form } from "react-bootstrap";
import { CartState } from "../contexts/Context";
import Rating from "../components/Rating";
import { AiFillDelete } from "react-icons/ai";

const Cart = () => {
  const {
    state: { cart },
    dispatch,
  } = CartState();

  const [total, setTotal] = useState();

  useEffect(() => {
    setTotal(
      cart.reduce((acc, curr) => acc + Number(curr.price) * curr.qty, 0)
    );
  }, [cart]);

  return (
    <div className="home">
      <div className="productContainer">
        <ListGroup>
          {cart.map((item) => (
            <ListGroup.Item key={item.id}>
              <Row>
                <Col md={2}>
                  <Image src={item.images} alt={item.product} fluid rounded />
                </Col>
                <Col md={2}>
                  <span>{item.product}</span>
                </Col>
                <Col md={2}>
                  <span>{item.price}</span>
                </Col>
                <Col md={2}>
                  <Rating rating={item.ratings} />
                </Col>
                <Col md={2}>
                  <Form.Control
                    as="select"
                    value={item.qty}
                    onChange={(e) => {
                      dispatch({
                        type: "CHANGE_CART_QTY",
                        payload: {
                          id: item.id,
                          qty: e.target.value,
                        },
                      });
                    }}
                  >
                    {[...Array(item.inStock).keys()].map((x) => (
                      <option key={x + 1}>{x + 1}</option>
                    ))}
                  </Form.Control>
                </Col>
                <Col md={2}>
                  <Button
                    type="button"
                    variant="light"
                    onClick={() => {
                      dispatch({
                        type: "REMOVE_FROM_CART",
                        payload: item,
                      });
                    }}
                  >
                    <AiFillDelete fontSize="20px" />
                  </Button>
                </Col>
              </Row>
            </ListGroup.Item>
          ))}
        </ListGroup>
        <div className="filters summary">
          <span className="title">Subtotal ({cart.length}) items</span>
          <span style={{ fontWeight: 700, fontSize: 20 }}>
            Total: $ {total}
          </span>
          <Button type="button" disabled={cart.length === 0}>
            Proceed to Checkout
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
