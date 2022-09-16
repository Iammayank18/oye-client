import React from "react";
import "./Header.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import $ from "jquery";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import logo from "./index.png";
const NavBar = () => {
  const { cartTotalQuantity } = useSelector((state) => state.cart);
  const navigate = useNavigate();
  useEffect(() => {
    if (sessionStorage.getItem("login") == "yes") {
      $("#login").css("display", "none");
      $("#logout").css("display", "block");

      if (sessionStorage.getItem("role") == "admin") {
        $("#dashboard").css("display", "block");
      } else {
        $("#dashboard").css("display", "none");
      }
    } else {
      $("#login").css("display", "block");
      $("#logout").css("display", "none");
      $("#dashboard").css("display", "none");
    }
  }, []);

  const logOut = async () => {
    console.log("logout");
    sessionStorage.removeItem("login");
    sessionStorage.removeItem("logtoken");
    // window.location.reload();
    const getRes = await axios.get("/api/logout");
    try {
      const response = getRes.data;
      console.log(response);
      if (response.msg === "logout") {
        toast.success("Logout Successfully", {
          autoClose: 900,
        });

        navigate("/account");
        setTimeout(() => {
          window.location.reload();
          localStorage.clear();
        }, 900);
      }
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div className="bg-light">
      <div className="container">
        <nav className="navbar navbar-expand-lg">
          <div className="container-fluid">
            <Link className="navbar-brand" to="/">
              <img src={logo} alt="" style={{ width: "10%" }} />
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav me-auto mb-2 mb-lg-0 header__bar">
                {/* <li className="nav-item">
                  <Link className="nav-link active" aria-current="page" to="/">
                    Home
                  </Link>
                </li> */}

                <li className="nav-item" id="login">
                  <Link to="account" className="nav-link">
                    Account
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/" className="nav-link">
                    Shop
                  </Link>
                </li>
                <li className="nav-item" id="dashboard">
                  <Link to="/dashboard" className="nav-link">
                    Dashboard
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/cart">
                    <div className="nav-bag">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="35"
                        height="35"
                        fill="currentColor"
                        className="bi bi-handbag-fill"
                        viewBox="0 0 16 16"
                      >
                        <path d="M8 1a2 2 0 0 0-2 2v2H5V3a3 3 0 1 1 6 0v2h-1V3a2 2 0 0 0-2-2zM5 5H3.36a1.5 1.5 0 0 0-1.483 1.277L.85 13.13A2.5 2.5 0 0 0 3.322 16h9.355a2.5 2.5 0 0 0 2.473-2.87l-1.028-6.853A1.5 1.5 0 0 0 12.64 5H11v1.5a.5.5 0 0 1-1 0V5H6v1.5a.5.5 0 0 1-1 0V5z" />
                      </svg>
                      <span className="bag-quantity">
                        <span>{cartTotalQuantity}</span>
                      </span>
                    </div>
                  </Link>
                </li>

                <li className="nav-item" id="logout">
                  <Link
                    to="#"
                    className="nav-link text-danger fw-bold"
                    onClick={logOut}
                  >
                    Logout
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default NavBar;
