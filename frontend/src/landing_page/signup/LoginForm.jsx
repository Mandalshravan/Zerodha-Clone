import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { TextField, Button, Box, Paper } from "@mui/material";
import "./LoginForm.css";

const Login = () => {
  const [formdata, setFormdata] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formdata;

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setFormdata({
      ...formdata,
      [name]: value,
    });
  };

  const handleError = (err) =>
    toast.error(err, {
      position: "bottom-left",
    });

  const handleSuccess = (msg) =>
    toast.success(msg, {
      position: "bottom-left",
    });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://zerodha-backend-axjb.onrender.com/api/auth/login",
        { ...formdata },
        { withCredentials: true }
      );

      console.log(response.data);

      // ✅ Fix: Check message directly instead of "success"
      if (response.data.message === "Login successful") {
        handleSuccess(response.data.message);
        setTimeout(() => {
          window.location.href = "https://zerodha-dashboard-8j1e.onrender.com/dashboard";
        }, 2000);
      } else {
        handleError(response.data.message || "Login failed");
      }
    } catch (err) {
      console.log(err);
      handleError("Something went wrong. Please try again.");
    }

    setFormdata({
      email: "",
      password: "",
    });
  };

  return (
    <Box className="form-container">
      <Paper className="form-card">
        <h2 className="form-title">Login</h2>
        <form onSubmit={handleSubmit}>
          <TextField
            type="email"
            label="Email"
            name="email"
            value={email}
            onChange={handleOnChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            type="password"
            label="Password"
            name="password"
            value={password}
            onChange={handleOnChange}
            fullWidth
            margin="normal"
            required
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            style={{ marginTop: "1rem" }}
          >
            Login
          </Button>

          <span style={{ marginTop: "1rem", display: "block" }}>
            Don't have an account? <Link to="/signup">Sign Up</Link>
          </span>
        </form>
      </Paper>
      <ToastContainer />
    </Box>
  );
};

export default Login;
