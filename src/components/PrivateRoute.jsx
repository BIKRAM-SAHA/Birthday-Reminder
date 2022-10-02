import React, { useContext } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { mainContext } from "../App";

function PrivateRoutes() {
  const { logout } = useContext(mainContext);
  const navigate =  useNavigate()

  const user = localStorage.getItem("user") || null;
  return user ? (
    <>
      <button
        className="logout"
        onClick={() => {
          logout();
          navigate("/login");
        }}
      >
        Log Out
      </button>
      <Outlet />
    </>
  ) : (
    <Navigate to="/login" replace />
  );
}

export default PrivateRoutes;
