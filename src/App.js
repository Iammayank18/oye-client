import "./App.css";
import { Routes, Route } from "react-router-dom";
import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Home from "./components/Home";
import NavBar from "./components/NavBar";
import Cart from "./components/Cart";
import Dashboard from "./page/dashboard/Dashboard";
import Account from "./page/account/Account";
function App() {
  return (
    <div className="App">
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
      />
      {/* Same as */}
      <ToastContainer />
      <NavBar />

      <div className="content-container">
        <Routes>
          <Route path="cart" element={<Cart />} />
          <Route path="/" index element={<Home />} />
          <Route path="account" element={<Account />} />
          <Route path="dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
