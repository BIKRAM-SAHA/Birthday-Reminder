import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { login } from "..//utils/authService";

function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const reset = () => {
    setEmail("");
    setPassword("");
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
    const response = await login(email, password);
    if (!response.token) {
      notify("error", `${response.msg}`);
      return;
    }
    localStorage.setItem("user", response.token);
    setTimeout(() => {
      localStorage.removeItem("user");
    }, 30 * 60 * 1000);
    notify("success", "Logged In!");
    navigate("/dashboard", { replace: true })
    reset();
  };
  return (
    <div className="container">
      <form className="card">
        LOGIN USER
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
        <div className="item buttons">
          <button type="submit" onClick={handleSubmit}>
            Submit
          </button>
          <Link to="/register">
            <button>Register</button>
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Login;
