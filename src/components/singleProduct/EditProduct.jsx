import React from "react";
import $ from "jquery";
import { GrClose } from "react-icons/gr";
const EditProduct = ({
  editdSingle,
  title,
  category,
  price,
  amount,
  editProd,
  imgs,
}) => {
  return (
    <div>
      <div className="showproduct" id="EditsingleProducts">
        <div className="container">
          <div className="container text-end">
            <div className="">
              <GrClose
                className="closeIcon"
                onClick={() => {
                  $("#EditsingleProducts").css("display", "none");
                  window.location.reload();
                }}
              />
            </div>
          </div>
          <h3>Update Product</h3>

          <div className="container">
            <div className="row">
              <div className="col-md-5">
                <img src="" id="editimg" alt="" />
              </div>
              <div className="col-md-7">
                <div className="input-group mb-3">
                  <input
                    type="file"
                    className="form-control"
                    id="editImage"
                    aria-describedby="inputGroupFileAddon04"
                    aria-label="Upload"
                  />
                </div>
                <div className="">
                  <div className="">
                    <div className="input-group mb-3">
                      <span className="input-group-text" id="basic-addon1">
                        Product Name
                      </span>
                      <input
                        id="editTitle"
                        type="text"
                        value={title}
                        name="title"
                        onChange={(e) => editProd(e)}
                        className="form-control"
                        placeholder="Product Name"
                        aria-label="Username"
                        aria-describedby="basic-addon1"
                      />
                    </div>
                  </div>
                  <div className="">
                    <div className="input-group mb-3">
                      <span className="input-group-text" id="basic-addon1">
                        Price
                      </span>
                      <input
                        id="editPrice"
                        type="text"
                        value={price}
                        name="price"
                        onChange={(e) => editProd(e)}
                        className="form-control"
                        placeholder="Price"
                        aria-label="Product Name"
                        aria-describedby="basic-addon1"
                      />
                    </div>
                  </div>
                </div>
                <div className="">
                  <div className="">
                    <div className="input-group mb-3">
                      <span className="input-group-text" id="basic-addon1">
                        Category
                      </span>

                      <select
                        id="editCategory"
                        type="text"
                        value={category}
                        name="category"
                        onChange={(e) => editProd(e)}
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
                  <div className="">
                    <div className="container">
                      <button
                        className="btn btn__log w-100"
                        id="upsingle"
                        onClick={editdSingle}
                      >
                        Update
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProduct;
