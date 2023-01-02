import React, { useState } from "react";
import "./../styles/Home.scss";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Fab,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
const dummyProducts = [
  { id: 1, name: "Product 1", price: 19.99 },
  { id: 2, name: "Product 2", price: 29.99 },
  { id: 3, name: "Product 3", price: 39.99 },
  { id: 1, name: "Product 1", price: 19.99 },
  { id: 2, name: "Product 2", price: 29.99 },
  { id: 3, name: "Product 3", price: 39.99 },
];

function generate(element) {
  return dummyProducts.map((value) =>
    React.cloneElement(element, {
      key: value,
    })
  );
}

function Home() {
  const [Cart, setCart] = useState([]);
  const addToCart = (product) => {
    console.log(...Cart);
    setCart([...Cart, product]);
  };

  const products = dummyProducts;
  return (
    <Box sx={{ "& > :not(style)": { m: 1 } }}>
      <div className="home">
        <h1 className="title">Welcome to Our E-Commerce Store</h1>
        <p className="subtitle">Here are some of our featured products:</p>
        <div className="addnew">
          <Button variant="outlined" color="inherit">
            Add New
          </Button>
        </div>
        {/* <ul className="list">
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
      </ul> */}{" "}
        <div className="list">
          {products.map((product) => (
            <Card
              color="inherit"
              sx={{ maxWidth: 345 }}
              key={product.id}
              className="list__items"
            >
              <CardMedia
                sx={{ height: 200 }}
                image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpNuOMXqLC_CFGX1PiUAcRAYB1sicxuHlH8g&usqp=CAU"
                title="Shoe"
                className="list__item-image"
              />
              <CardContent className="list__item-details">
                <Typography gutterBottom variant="h5" component="div">
                  {product.name}- ${product.price}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Product Description
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  color="inherit"
                  onClick={(event) => addToCart(product)}
                >
                  Add To Cart
                </Button>
                {/* <Button size="small">Learn More</Button> */}
              </CardActions>
            </Card>
          ))}
        </div>
        <div className="FAB">
          <Fab
            color="inherit"
            aria-label="add"
            variant="extended"
            key={Cart.length}
          >
            {Cart.length} Items in Cart
          </Fab>
        </div>
        <p className="footer">Thank you for visiting!</p>
      </div>
    </Box>
  );
}

export default Home;
