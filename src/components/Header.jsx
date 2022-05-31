import React from "react";
import {
  Container,
  Dropdown,
  FormControl,
  Nav,
  Navbar,
  Badge,
  Button,
} from "react-bootstrap";
import { AiFillDelete } from "react-icons/ai";

import { FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { CartState } from "../contexts/Context";

const Header = () => {
  const {
    state: { cart },
    dispatch,
    productDispatch
  } = CartState();

  return (
    <Navbar bg="dark" variant="dark" style={{ height: 80 }}>
      <Container>
        <Navbar.Brand>
          <Link to="/">Shopping Cart</Link>
        </Navbar.Brand>
        <Navbar.Text className="search">
          <FormControl
            style={{ width: 500 }}
            placeholder="Search a Product"
            className="m-auto"
            onChange={(e) => {
              productDispatch({
                type: 'FILTER_BY_SEARCH',
                payload: e.target.value,
              })
            }}
          />
        </Navbar.Text>
        <Nav>
          <Dropdown align={{ sm: "right" }}>
            <Dropdown.Toggle variant="success">
              <FaShoppingCart color="white" fontSize="25px" />
              <Badge bg="none">{cart.length ? cart.length : null}</Badge>
            </Dropdown.Toggle>

            <Dropdown.Menu style={{ minWidth: 370 }}>
              {cart.length > 0 ? (
                <>
                  {cart.map((item) => (
                    <span className="cartitem" key={item.id}>
                      <img
                        src={item.images}
                        className="cartItemImg"
                        alt={item.product}
                      />
                      <div className="cartItemDetail">
                        <span>{item.product}</span>
                        <span>₹ {item.price.split(".")[0]}</span>
                      </div>
                      <AiFillDelete
                        fontSize="20px"
                        style={{ cursor: "pointer" }}
                        onClick={() =>
                          dispatch({
                            type: "REMOVE_FROM_CART",
                            payload: item,
                          })
                        }
                      />
                    </span>
                  ))}
                  <Link to="/cart">
                    <Button style={{ width: "95%", margin: "0 10px" }}>
                      Go To Cart
                    </Button>
                  </Link>
                </>
              ) : (
                <span style={{ padding: 10 }}>Cart is Empty!</span>
              )}
            </Dropdown.Menu>
          </Dropdown>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Header;
