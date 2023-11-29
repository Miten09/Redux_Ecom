import { Button, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authTrue } from "../features/auth/authSlice";
import { LoginCart } from "../features/cart/cartSlice";

const Login = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const authorization = {
    auth: [
      {
        name: "karan",
        password: 1234,
        role: "user",
      },
      {
        name: "miten",
        password: 1234,
        role: "admin",
      },
      {
        name: "zeel",
        password: 5678,
        role: "user",
      },
    ],
  };

  const handleLogin = () => {
    const auth = authorization.auth.filter((val) => val.name === name);

    if (auth[0].name == name && auth[0].password == password) {
      dispatch(authTrue());
      dispatch(LoginCart());
      navigate("/home");
      localStorage.setItem("Login", auth[0].role);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("Login")) {
      navigate("/home");
    } else {
      navigate("/login");
    }
  }, []);

  return (
    <div style={{ textAlign: "center", margin: "10%" }}>
      <h2>Login Form</h2>
      <TextField
        id="outlined-basic"
        value={name}
        name="name"
        label="Your Name"
        onChange={(e) => setName(e.target.value)}
        variant="outlined"
        type="email"
        required
      />
      <br />
      <br />
      <TextField
        id="outlined-basic"
        value={password}
        label="Password"
        name="password"
        onChange={(e) => setPassword(e.target.value)}
        variant="outlined"
        type="password"
        required
      />
      <br />
      <br />
      <Button variant="contained" color="success" onClick={handleLogin}>
        Login
      </Button>
    </div>
  );
};

export default Login;
