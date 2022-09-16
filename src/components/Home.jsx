import { useDispatch, useSelector } from "react-redux";
import React from "react";
import { useNavigate } from "react-router-dom";
import { addToCart } from "../slices/cartSlice";
import { useEffect, useState } from "react";
import axios from "axios";
import $ from "jquery";
import "./Shop.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.js";
import { BsSearch } from "react-icons/bs";
import { getTotals } from "../slices/cartSlice";

const Home = () => {
  const { items: products, status } = useSelector((state) => state.products);
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [datas, setDatas] = useState([]);

  const AuthenticateUser = async () => {
    const cdata = sessionStorage.getItem("logtoken");
    const jsonData = {
      logtoken: cdata,
    };
    if (cdata === null || cdata === undefined || cdata === "") {
      navigate("/account");
    } else {
      const response = await axios.post(
        "https://concerned-eel-battledress.cyclic.app/api/profile",
        jsonData
      );
      try {
        console.log(response.data);
        if (response.data.msg === "Profile") {
          localStorage.setItem("user", response.data.data.email);
          navigate("/");
        } else {
          navigate("/account");
        }
      } catch (e) {
        console.log("data", response.data);
        navigate("/account");
      }
    }
  };

  const fetchProducts = async () => {
    const response = await axios.get(
      "https://concerned-eel-battledress.cyclic.app/api/get/allproduct"
    );
    try {
      setData(response.data.data);
      setDatas(response.data.data);
    } catch (e) {
      console.log(e);
    }
  };

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    // navigate("/cart");
  };

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const filteredCoins = datas.filter((coin) =>
    coin.title.toLowerCase().includes(search.toLowerCase())
  );

  const filterBycat = (e) => {
    const val = e.target.value;
    console.log(val);
    if (val === "all") {
      setDatas(data);
    } else {
      const filteredCoins = data.filter((coin) => coin.category === val);
      setDatas(filteredCoins);
    }
  };

  const sorPrice = (e) => {
    const val = e.target.value;

    const filteredCoins = data.sort((a, b) => a.price - b.price);
    const fata = filteredCoins.filter((coin) => coin.price);

    if (val === "low") {
      setDatas(fata);
    } else if (val === "high") {
      const filteredCoins = data.sort((a, b) => b.price - a.price);
      const fatas = filteredCoins.filter((coin) => coin.price);
      setDatas(fatas);
    } else {
      setDatas(data);
    }
  };

  const expandSearch = () => {
    $("#sbar").toggleClass("expand");
    $("#sbar").focus();
  };

  useEffect(() => {
    fetchProducts();
    AuthenticateUser();
    dispatch(getTotals());
  }, [cart, dispatch]);

  return (
    <div className="home-container">
      <h2>😁 Welcome to my shop</h2>
      <div className="row search__header pb-1">
        <div className="col-md-3 ">
          <select
            className="form-select s1"
            aria-label="Default select example"
            onChange={filterBycat}
          >
            <option value="all">Filter by category</option>
            <option value="men">Men</option>
            <option value="women">Women</option>
            <option value="adult">Adult</option>
            <option value="kids">Kids</option>
          </select>
        </div>
        <div className="col-md-3">
          <select
            className="form-select s2"
            aria-label="Default select example"
            onChange={sorPrice}
          >
            <option value="">Sort by price</option>
            <option value="low">low to high</option>
            <option value="high">high to low</option>
          </select>
        </div>
        <form className="col-md-6 text-end">
          <input
            type="search"
            className="searchbar s3"
            name="search"
            id="sbar"
            placeholder="Search products.."
            onChange={handleChange}
            autoComplete="off"
          />
          <BsSearch className="searchIcon" onClick={expandSearch} />
        </form>
      </div>
      {status === "success" ? (
        <>
          <div className="products">
            {data &&
              filteredCoins?.map((product) => (
                <div
                  key={product.id}
                  className="card"
                  style={{ width: "18rem" }}
                >
                  <h3>{product.title}</h3>
                  <img
                    src={"http://localhost:4000/productImage/" + product.image}
                    alt={product.name}
                    className="card-img-top"
                  />
                  <div className="details">
                    <span>{product.category}</span>
                    <span className="price">
                      &#x20b9;
                      {product.price}
                    </span>
                  </div>
                  <button onClick={() => handleAddToCart(product)}>
                    Add To Cart
                  </button>
                </div>
              ))}
          </div>
        </>
      ) : status === "pending" ? (
        <p>Loading...</p>
      ) : (
        <p>Unexpected error occured...</p>
      )}
    </div>
  );
};

export default Home;
