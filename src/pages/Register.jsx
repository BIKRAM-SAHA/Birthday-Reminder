import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useState } from "react";
import { register } from "..//utils/authService";

function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  const reset = () => {
    setName("");
    setEmail("");
    setPassword("");
    setPassword2("");
  };

  const notify = (status, msg) => {
    switch (status) {
      case "success":
        return toast.success(msg);
      case "error":
        return toast.error(msg);
      default:
        break;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== password2) {
      notify("error", "Confirm Password doesnt match!");
      return;
    }
    const response = await register(name, email, password);
    if (!response.token) {
      notify("error", `${response.msg}`);
      return;
    }
    localStorage.setItem("user", response.token);
    setTimeout(() => {
      localStorage.removeItem("user");
    }, 30 * 60 * 1000);
    notify("success", "User has been created!");
    reset();
    navigate("/dashboard", { replace: true });
  };

  return (
    <div className="container">
      <form className="card">
        REGISTER USER
        <div className="item">
          <label htmlFor="name">Name: </label>
          <input
            type="text"
            id="name"
            placeholder="Enter Name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </div>
        <div className="item">
          <label htmlFor="email">Email: </label>
          <input
            type="text"
            id="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>
        <div className="item">
          <label htmlFor="password">Password: </label>
          <input
            type="text"
            id="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        <div className="item">
          <label htmlFor="password2">Repeat Password:</label>
          <input
            type="text"
            id="password2"
            placeholder="Confirm Password"
            value={password2}
            onChange={(e) => {
              setPassword2(e.target.value);
            }}
          />
        </div>
        <div className="item buttons">
          <button type="submit" onClick={handleSubmit}>
            Submit
          </button>
          <Link to="/login">
            <button>Log In</button>
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Register;
