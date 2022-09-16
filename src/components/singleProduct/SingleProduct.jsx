import React from "react";
import "./SingleProduct.css";
import { GrClose } from "react-icons/gr";
import $ from "jquery";
const SingleProduct = ({
  uplodadSingle,
  title,
  category,
  price,
  amount,
  uplodadProd,
}) => {
  const closeproducts = () => {
    $("#singleProducts").css("display", "none");
  };
  return (
    <div className="showproduct" id="singleProducts">
      <div className="container">
        <div className="container text-end">
          <div className="">
            <GrClose className="closeIcon" onClick={closeproducts} />
          </div>
        </div>
        <h3>Upload Product</h3>
        <div className="container">
          <div className="row">
            <div className="col">
              <div className="input-group">
                <input
                  type="file"
                  className="form-control"
                  id="prodImage"
                  aria-describedby="inputGroupFileAddon04"
                  aria-label="Upload"
                />
              </div>
            </div>
            <div className="col">
              <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon1">
                  Product Name
                </span>
                <input
                  id="prodTitle"
                  type="text"
                  value={title}
                  name="title"
                  onChange={(e) => uplodadProd(e)}
                  className="form-control"
                  placeholder="Product Name"
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon1">
                  Price
                </span>
                <input
                  id="prodPrice"
                  type="text"
                  value={price}
                  name="price"
                  onChange={(e) => uplodadProd(e)}
                  className="form-control"
                  placeholder="Price"
                  aria-label="Product Name"
                  aria-describedby="basic-addon1"
                />
              </div>
            </div>
            <div className="col">
              <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon1">
                  Amount
                </span>
                <input
                  id="prodCategory"
                  type="number"
                  value={amount}
                  name="amount"
                  onChange={(e) => uplodadProd(e)}
                  className="form-control"
                  placeholder="Amount"
                  aria-label="Product Name"
                  aria-describedby="basic-addon1"
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon1">
                  Category
                </span>

                <select
                  id="productName"
                  type="text"
                  value={category}
                  name="category"
                  onChange={(e) => uplodadProd(e)}
                  className="form-control"
                  placeholder="Category"
                  aria-label="Product Name"
                  aria-describedby="basic-addon1"
                >
                  <option value="">Select Category</option>
                  <option value="men">Men</option>
                  <option value="women">Women</option>
                  <option value="adult">Adult</option>
                  <option value="kids">Kids</option>
                </select>
              </div>
            </div>
            <div className="col">
              <div className="container">
                <button
                  className="btn btn__log "
                  id="upsingle"
                  onClick={uplodadSingle}
                >
                  Add Product
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
