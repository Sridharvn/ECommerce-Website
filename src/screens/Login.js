import { Button, TextField } from "@mui/material";
import React, { useState } from "react";
import "../styles/Login.scss";

function LoginForm() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((formData) => ({
      ...formData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // send login request to server
  };

  return (
    <div className="form__wrapper">
      <h1>Login</h1>
      <form onSubmit={handleSubmit} className="form">
        <TextField
          label="Username"
          name="username"
          className="form__input"
          value={formData.username}
          onChange={handleChange}
        />
        <br />
        <TextField
          label="Password"
          type="password"
          name="password"
          className="form__input"
          value={formData.password}
          onChange={handleChange}
        />
        <br />
        <div className="form__button-wrapper">
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className="form__button"
          >
            Login
          </Button>
        </div>
      </form>{" "}
    </div>
  );
}

export default LoginForm;
