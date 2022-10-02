import "./styles/App.css";
import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AddPersonForm from "./components/AddPersonForm";
import Birthdays from "./components/Birthdays";
import "react-toastify/dist/ReactToastify.css";
import { createContext } from "react";
import PrivateRoutes from "./components/PrivateRoute";
import NotFound from "./pages/NotFound";

export const mainContext = createContext();

function App() {
  const logout = () => {
    localStorage.removeItem("user");
  };

  return (
    <mainContext.Provider
      value={{
        logout,
      }}
    >
      <ToastContainer />
      <HashRouter>
        <Routes>
          <Route path="/" exact element={<Navigate to="/dashboard" />} />
          <Route element={<PrivateRoutes />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/dashboard/personForm" element={<AddPersonForm />} />
            <Route path="dashboard/allbirthdays" element={<Birthdays />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </HashRouter>
    </mainContext.Provider>
  );
}

export default App;
