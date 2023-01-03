import { Button, TextField } from "@mui/material";
import React, { useState } from "react";
import "../styles/Login.scss";

function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // const handleChange = (event) => {
  //   const { name, value } = event.target;
  //   setFormData((formData) => ({
  //     ...formData,
  //     [name]: value,
  //   }));
  // };

  const handleSubmit = (event) => {
    event.preventDefault();
    // send login request to server
    fetch("http://localhost:4000/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.token) {
          localStorage.setItem("token", data.token);
          // Redirect to the dashboard
          window.location.href = "/";
        } else {
          setError(data.error);
        }
      });
  };

  return (
    <div className="form__wrapper">
      <h1>Login</h1>
      <form onSubmit={handleSubmit} className="form">
        <TextField
          label="Username"
          name="username"
          className="form__input"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />
        <br />
        <TextField
          label="Password"
          type="password"
          name="password"
          className="form__input"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
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
