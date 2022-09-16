import React from "react";
import "./Account.css";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { BsEyeFill } from "react-icons/bs";
import $ from "jquery";
const Account = () => {
  const navigate = useNavigate();
  const [user, setUser] = React.useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loggedIn, setLoggedIn] = React.useState({
    email: "",
    password: "",
  });

  const submitUser = (e) => {
    e.preventDefault();
    console.log("reg");
    console.log(user);
    if (user.password !== user.confirmPassword) {
      toast.warning("Passwords do not match", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    } else if (
      user.email === "" ||
      user.password === "" ||
      user.confirmPassword === ""
    ) {
      toast.warning("Please fill all the fields", {
        position: "top-right",
        autoClose: 1000,
      });
    } else {
      axios
        .post("/api/register", user)
        .then((res) => {
          console.log(res.data);
          if (res.data.msg === "User registered successfully") {
            toast.success("Successfully registered", {
              position: "top-right",
              autoClose: 1000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
            setTimeout(() => {
              window.location.reload();
            }, 1000);
          } else if (res.data.msg === "email exists") {
            toast.error("User already exists", {
              position: "top-right",
              autoClose: 1000,
              hideProgressBar: false,
              closeOnClick: true,
              draggable: true,
              progress: undefined,
            });
          } else {
            toast.error("Failed to register", {
              position: "top-right",
              autoClose: 1000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          }
        })
        .catch((err) => {
          console.log(err);
          toast.warn("Failed to register", {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        });
    }
  };

  const loginUser = (e) => {
    e.preventDefault();
    console.log("log");
    if (loggedIn.email === "" || loggedIn.password === "") {
      toast.warning("Please fill all fields", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    } else {
      axios
        .post("/api/login", loggedIn)
        .then((res) => {
          console.log(res.data);
          console.log(res.data.data.role);
          if (res.data.msg === "Login Successful") {
            toast.success("Loggedin Successful", {
              position: "top-right",
              autoClose: 1000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
            if (res.data.data.role === "admin") {
              sessionStorage.setItem("login", "yes");
              sessionStorage.setItem("role", res.data.data.role);
              sessionStorage.setItem("logtoken", res.data.token);

              sessionStorage.setItem("userEmail", loggedIn.email);
              setTimeout(() => {
                window.location.reload();
              }, 1000);
              navigate("/dashboard");
            } else {
              sessionStorage.setItem("role", res.data.data.role);
              sessionStorage.setItem("login", "yes");
              sessionStorage.setItem("logtoken", res.data.token);
              sessionStorage.setItem("userEmail", loggedIn.email);
              setTimeout(() => {
                window.location.reload();
              }, 1000);
              navigate("/");
            }
          } else if (res.data.msg === "User Does Not Exist") {
            toast.error("User Does Not Exist", {
              position: "top-right",
              autoClose: 1000,
              hideProgressBar: false,
              closeOnClick: true,
              draggable: true,
              progress: undefined,
            });
          } else if (res.data.msg === "Invalid Credentials") {
            toast.error("Invalid Credentials", {
              position: "top-right",
              autoClose: 1000,
              hideProgressBar: false,
              closeOnClick: true,
              draggable: true,
              progress: undefined,
            });
          } else {
            toast.error("Failed to login", {
              position: "top-right",
              autoClose: 1000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          }
        })
        .catch((err) => {
          console.log(err);
          toast.warn("Failed to login", {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        });
    }
  };

  const passStrength = () => {
    // progressBar
    //check the passwotrd strength regex here
    const pass = document.getElementById("rpassword").value;
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    //increase the progress bar in step of 25% each time the password is typed whhen the length increase by 5 characters using reges

    if (pass.length === 0) {
      document.getElementById("progressBar").style.width = "0%";
      document.getElementById("progressBar").innerHTML = "0%";
      document.getElementById("progressBar").style.background = "#EB5353";
    } else if (pass.length <= 3) {
      document.getElementById("progressBar").style.width = "25%";
      document.getElementById("progressBar").innerHTML = "😵 Weak";
      document.getElementById("progressBar").style.background = "#EB5353";
    } else if (pass.length <= 5) {
      document.getElementById("progressBar").style.width = "50%";
      document.getElementById("progressBar").innerHTML = "🙄 Medium";
      document.getElementById("progressBar").style.background = "#FF5B00";
    } else if (pass.length <= 8) {
      document.getElementById("progressBar").style.width = "75%";
      document.getElementById("progressBar").innerHTML = "😎 Good";
      document.getElementById("progressBar").style.background = "#14C38E";
    } else if (pass.length <= 12) {
      if (regex.test(pass)) {
        document.getElementById("progressBar").style.width = "100%";
        document.getElementById("progressBar").innerHTML = "🔥 Strong";
        document.getElementById("progressBar").style.background = "#019267";
      } else {
        document.getElementById("progressBar").style.width = "75%";
        document.getElementById("progressBar").innerHTML = "😎 Good";
        document.getElementById("progressBar").style.background = "#14C38E";
      }
    } else {
      document.getElementById("progressBar").style.width = "0%";
    }
  };

  const checkEmail = () => {
    const email = $("#remail").val();
    const emailReg =
      /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;
    if (email.length === 0) {
      $("#emailcheck").html("Please enter email id");
    } else if (!emailReg.test(email)) {
      $("#emailcheck").html("Please enter a valid email id");
    } else {
      $("#emailcheck").html("");
    }
  };
  return (
    <div className="container login__section wave">
      <div>
        <ul
          className="nav nav-pills mb-3 acc_navs"
          id="pills-tab"
          role="tablist"
        >
          <li className="nav-item" role="presentation">
            <button
              className="nav-link active"
              id="pills-home-tab"
              data-bs-toggle="pill"
              data-bs-target="#pills-home"
              type="button"
              role="tab"
              aria-controls="pills-home"
              aria-selected="true"
            >
              Login
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button
              className="nav-link"
              id="pills-profile-tab"
              data-bs-toggle="pill"
              data-bs-target="#pills-profile"
              type="button"
              role="tab"
              aria-controls="pills-profile"
              aria-selected="false"
            >
              Register
            </button>
          </li>
        </ul>
        <div className="tab-content" id="pills-tabContent">
          <div
            className="tab-pane fade show active"
            id="pills-home"
            role="tabpanel"
            aria-labelledby="pills-home-tab"
            tabindex="0"
          >
            <form onSubmit={loginUser}>
              <div className="mb-3">
                <label className="form-label">Email address</label>
                <input
                  type="email"
                  className="form-control"
                  id="lemail"
                  aria-describedby="emailHelp"
                  name="email"
                  value={loggedIn.email}
                  onChange={(e) => {
                    setLoggedIn({ ...loggedIn, email: e.target.value });
                  }}
                />
                <div id="emailHelp3" className="form-text">
                  We'll never share your email with anyone else.
                </div>
              </div>
              <div className="mb-3">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="lpassword"
                  name="password"
                  value={loggedIn.password}
                  onChange={(e) => {
                    setLoggedIn({ ...loggedIn, password: e.target.value });
                  }}
                />
              </div>

              <button type="submit" className="btn btn__log">
                Submit
              </button>
            </form>
          </div>
          <div
            className="tab-pane fade"
            id="pills-profile"
            role="tabpanel"
            aria-labelledby="pills-profile-tab"
            tabindex="0"
          >
            <form onSubmit={submitUser}>
              <div className="mb-3">
                <label className="form-label">Email address</label>
                <input
                  type="email"
                  className="form-control"
                  id="remail"
                  name="email"
                  value={user.email}
                  aria-describedby="emailHelp"
                  onChange={(e) => setUser({ ...user, email: e.target.value })}
                  onKeyUp={checkEmail}
                  autoComplete="off"
                />

                <div id="emailcheck" className="form-text text-danger"></div>
              </div>
              <div className="mb-3">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="rpassword"
                  name="password"
                  value={user.password}
                  onChange={(e) =>
                    setUser({ ...user, password: e.target.value })
                  }
                  onKeyUp={passStrength}
                />

                <BsEyeFill
                  className="eye"
                  onClick={() => {
                    if (
                      document.getElementById("rpassword").type === "password"
                    ) {
                      document.getElementById("rpassword").type = "text";
                    } else {
                      document.getElementById("rpassword").type = "password";
                    }
                  }}
                />

                <div id="emailHelp4" className="form-text">
                  Password must contain at least 8 characters and Upper and
                  lowercase letters, numbers and special characters.
                </div>
                <div className="progress mt-2 pb">
                  <div
                    className="progress-bar pb"
                    role="progressbar"
                    id="progressBar"
                    style={{ width: "0%" }}
                    aria-valuenow="25"
                    aria-valuemin="0"
                    aria-valuemax="100"
                  ></div>
                </div>
              </div>
              <div className="mb-3">
                <label className="form-label">Confirm Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="rcpassword"
                  value={user.confirmPassword}
                  name="confirmPassword"
                  onChange={(e) =>
                    setUser({ ...user, confirmPassword: e.target.value })
                  }
                />
              </div>

              <button type="submit" className="btn btn__log">
                Submit
              </button>
            </form>
          </div>
          <div
            className="tab-pane fade"
            id="pills-contact"
            role="tabpanel"
            aria-labelledby="pills-contact-tab"
            tabindex="0"
          >
            ...
          </div>
          <div
            className="tab-pane fade"
            id="pills-disabled"
            role="tabpanel"
            aria-labelledby="pills-disabled-tab"
            tabindex="0"
          >
            ...
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
