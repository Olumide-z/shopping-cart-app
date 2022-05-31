import { createContext, useContext, useReducer } from "react";
import productData from '../data.json';
import { cartReducer, productReducer } from "./Reducers";

const Cart = createContext()

const Context = ({ children }) => {
  const products = productData;
  
  const [state, dispatch] = useReducer(cartReducer, {
    products: products,
    cart: [],
  });

  const [productState, productDispatch] = useReducer(productReducer, {
    byStock: false,
    byFastDelivery: false,
    byRating: 0,
    searchQuery: '',
  });

  return <Cart.Provider value={{ state, dispatch, productState, productDispatch }}>{children}</Cart.Provider>
}

export default Context

export const CartState = () => {
  return useContext(Cart)
}