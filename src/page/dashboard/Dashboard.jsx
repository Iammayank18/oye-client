import React from "react";
import EditProduct from "../../components/singleProduct/EditProduct";
import SingleProduct from "../../components/singleProduct/SingleProduct";
// import data from "../../data";
import $ from "jquery";
import { toast } from "react-toastify";
import axios from "axios";
import { useEffect } from "react";
import "./Dashboard.css";
const UseComp = ({
  title,
  price,
  category,
  image,
  removeProducts,
  editProducts,
}) => {
  return (
    <div className="container my-3 text-center border p-3 rounded">
      <div className="row">
        <div className="col-md-3">
          <img
            src={"http://localhost:4000/productImage/" + image}
            alt="product"
            className="img-fluid w-25"
          />
        </div>
        <div className="col-md-3 text-start cen">
          <h5>{title}</h5>
        </div>
        <div className="col-md-3 cen">
          <div>
            <h5>&#x20b9; {price}</h5>
            <span>
              category: <b>{category}</b>
            </span>
          </div>
        </div>
        <div className="col-md-3 cen">
          <div>
            <button className="btn btn-success mx-2" onClick={editProducts}>
              Edit
            </button>
            <button className="btn btn-danger" onClick={removeProducts}>
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
const Dashboard = () => {
  const [prod, setProd] = React.useState({
    title: "",
    price: "",
    category: "",
  });

  const [eprod, setEprod] = React.useState({
    title: "",
    price: "",
    category: "",
  });

  const [data, setData] = React.useState([]);

  const fetchData = async () => {
    const response = await axios.get("/api/get/allproduct");

    try {
      const datas = response.data.data;
      setData(datas);
      console.log(datas);
      // sessionStorage.setItem("data", JSON.stringify(data));
    } catch (err) {
      console.log(err);
    }
  };

  const addNewProduct = () => {
    console.log("addNewProduct");
    $("#singleProducts").css("display", "block");
  };

  const uplodadSingle = async () => {
    console.log(prod);
    const formdata = new FormData();
    formdata.append("title", prod.title);
    formdata.append("price", prod.price);
    formdata.append("category", prod.category);
    formdata.append("amount", prod.amount);
    formdata.append("image", $("#prodImage")[0].files[0]);
    const response = await axios.post("/api/add/product", formdata);
    try {
      console.log(response.data);
      if (response.data.msg === "Product Added") {
        toast.success("Product Added Successfully", {
          position: "top-right",
          autoClose: 900,
        });
        setTimeout(() => {
          window.location.reload();
        }, 900);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const removeProducts = async (id) => {
    console.log(id);
    const jsonData = {
      id: id,
    };
    console.log(jsonData);
    const removeIt = await axios.delete("/api/delete/product", {
      data: jsonData,
      method: "DELETE",
    });
    try {
      console.log(removeIt.data);
      if (removeIt.data.msg === "Product Deleted") {
        toast.success("Product deleted successfully", {
          autoClose: 900,
        });
      } else {
        toast.error("Unable to delete", {
          autoClose: 900,
        });
      }
      fetchData();
    } catch (err) {
      console.log(err);
    }
  };
  const editProducts = async (id) => {
    console.log(id);
    $("#EditsingleProducts").css("display", "block");
    sessionStorage.setItem("id", id);
    const response = await axios.get("/api/get/singleproduct/" + id);
    try {
      const data = response.data.data;
      setEprod({
        title: data.title,
        price: data.price,
        category: data.category,
      });

      $("#editimg").attr(
        "src",
        "http://localhost:4000/productImage/" + data.image
      );
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };
  const editdSingle = async () => {
    console.log(eprod);
    const formdata = new FormData();
    formdata.append("title", eprod.title);
    formdata.append("price", eprod.price);
    formdata.append("category", eprod.category);
    formdata.append("amount", eprod.amount);
    formdata.append("image", $("#editImage")[0].files[0]);
    formdata.append("id", sessionStorage.getItem("id"));
    const response = await axios.patch("/api/update/product", formdata);
    try {
      console.log(response.data);
      if (response.data.msg === "Product Updated") {
        toast.success("Product Updated Successfully", {
          position: "top-right",
          autoClose: 900,
        });
        setTimeout(() => {
          window.location.reload();
        }, 900);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="container">
      <SingleProduct
        title={prod.title}
        price={prod.price}
        category={prod.category}
        amount={prod.amount}
        uplodadProd={(e) => {
          setProd({ ...prod, [e.target.name]: e.target.value });
        }}
        uplodadSingle={uplodadSingle}
      />
      <EditProduct
        title={eprod.title}
        price={eprod.price}
        category={eprod.category}
        editProd={(e) => {
          setEprod({ ...eprod, [e.target.name]: e.target.value });
        }}
        editdSingle={editdSingle}
      />
      <div className="text-center my-5">
        <h1>😎 Dashboard</h1>
      </div>
      <div className="container">
        <div className="d-flex justify-content-between">
          <div>
            <h3>Products</h3>
          </div>
          <div>
            <button className="btn btn-success" onClick={addNewProduct}>
              Add Products
            </button>
          </div>
        </div>
      </div>
      <div className="container">
        {data.map((elem, index) => {
          return (
            <UseComp
              key={index}
              {...elem}
              removeProducts={() => removeProducts(elem._id)}
              editProducts={() => editProducts(elem._id)}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Dashboard;
