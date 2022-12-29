import React from "react";
import "./../styles/Home.scss";
const dummyProducts = [
  { id: 1, name: "Product 1", price: 19.99 },
  { id: 2, name: "Product 2", price: 29.99 },
  { id: 3, name: "Product 3", price: 39.99 },
  { id: 1, name: "Product 1", price: 19.99 },
  { id: 2, name: "Product 2", price: 29.99 },
  { id: 3, name: "Product 3", price: 39.99 },
];
function Home(props) {
  //   const { products } = props;
  const products = dummyProducts;
  return (
    <div className="home">
      <h1 className="title">Welcome to Our E-Commerce Store</h1>
      <p className="subtitle">Here are some of our featured products:</p>
      <div className="addnew">
        <button>Add +</button>
      </div>
      <ul className="list">
        {products.map((product) => (
          <li key={product.id} className="list__items">
            <div className="list__item-details">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpNuOMXqLC_CFGX1PiUAcRAYB1sicxuHlH8g&usqp=CAU"
                alt=""
                className="list__item-image"
              />
              {product.name} - ${product.price}
            </div>
          </li>
        ))}
      </ul>
      <p className="footer">Thank you for visiting!</p>
    </div>
  );
}

export default Home;
