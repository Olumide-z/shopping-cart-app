import React from "react";
import Filter from "../components/Filter";
import SingleProduct from "../components/SingleProduct";
import { CartState } from "../contexts/Context";

import "../components/styles.css";

const Home = () => {
  const {
    state: { products },
    productState: { byStock, byFastDelivery, sort, byRating, searchQuery },
  } = CartState();
  // console.log(products)

  const transformProducts = () => {
    let sortedProducts = products;

    if (sort) {
      sortedProducts = sortedProducts.sort((a, b) =>
        sort === "lowToHigh" ? a.price - b.price : b.price - a.price
      );
    }

    if(!byStock) {
      sortedProducts = sortedProducts.filter((item) => item.inStock);
    }

    if(byFastDelivery){
      sortedProducts = sortedProducts.filter((item) => item.fastDelivery);
    }

    if (byRating) {
      sortedProducts = sortedProducts.filter((item) => item.ratings >= byRating)
    };

    if (searchQuery) {
      sortedProducts = sortedProducts.filter((item) => 
        item.products.toLowerCase().includes(searchQuery)
      );
    }

    return sortedProducts;
  };


  return (
    <div className="home">
      <Filter />
      <div className="productContainer">
        {transformProducts().map((item) => (
          <SingleProduct item={item} key={item.id} />
        ))}
      </div>
    </div>
  );
};

export default Home;
