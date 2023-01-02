import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import "./../styles/Home.scss";

function EcommerceDashboard() {
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    price: "",
  });
  const [isAddFormVisible, setIsAddFormVisible] = useState(false);
  const [isEditFormVisible, setIsEditFormVisible] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch("http://localhost:4000/api/products");
      const data = await response.json();
      setProducts(data);
    };
    fetchProducts();
  }, []);
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((formData) => ({
      ...formData,
      [name]: value,
    }));
  };
  const handleAddProduct = () => {
    setIsAddFormVisible(true);
  };

  const handleCancelAdd = () => {
    setIsAddFormVisible(false);
    setFormData({
      id: "",
      name: "",
      price: "",
    });
  };
  const handleSaveAdd = async () => {
    const response = await fetch("http://localhost:4000/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    const data = await response.json();
    setProducts((products) => [...products, data]);
    setIsAddFormVisible(false);
    setFormData({
      id: "",
      name: "",
      price: "",
    });
    setIsAddFormVisible(false);
  };
  const handleEditProduct = (product) => {
    setFormData(product);
    setIsEditFormVisible(true);
  };
  const handleCancelEdit = () => {
    setIsEditFormVisible(false);
    setFormData({
      id: "",
      name: "",
      price: "",
    });
  };
  const handleSaveEdit = async () => {
    const response = await fetch(
      `http://localhost:4000/api/products/${formData.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }
    );
    const data = await response.json();
    setProducts((products) =>
      products.map((product) => (product.id === data.id ? data : product))
    );
    setIsEditFormVisible(false);
    setFormData({
      id: "",
      price: "",
    });
    setIsAddFormVisible(false);
  };

  const handleDeleteProduct = async (product) => {
    const response = await fetch(
      `http://localhost:4000/api/products/${product.id}`,
      {
        method: "DELETE",
      }
    );
    if (response.ok) {
      setProducts((products) => products.filter((p) => p.id !== product.id));
    }
  };

  return (
    <div className="ecommerce-dashboard">
      <Paper>
        {isAddFormVisible ? (
          <form>
            <TextField
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
            <br />
            <TextField
              label="Price"
              name="price"
              type="number"
              value={formData.price}
              onChange={handleChange}
            />
            <br />
            <Button onClick={handleCancelAdd}>Cancel</Button>
            <Button onClick={handleSaveAdd}>Save</Button>
          </form>
        ) : (
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>{product.id}</TableCell>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>{product.price}</TableCell>
                  <TableCell>
                    <Button onClick={() => handleEditProduct(product)}>
                      Edit
                    </Button>
                    <Button onClick={() => handleDeleteProduct(product)}>
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
        {isEditFormVisible ? (
          <form>
            <TextField
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
            <br />
            <TextField
              label="Price"
              name="price"
              type="number"
              value={formData.price}
              onChange={handleChange}
            />
            <br />
            <Button onClick={handleCancelEdit}>Cancel</Button>
            <Button onClick={handleSaveEdit}>Save</Button>
          </form>
        ) : (
          <Button onClick={handleAddProduct}>Add Product</Button>
        )}
      </Paper>
    </div>
  );
}

export default EcommerceDashboard;
