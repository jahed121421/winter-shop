import axios from "axios";
import useSingleproduct from "../../Coustom Hook/useSingleproduct";
import Swal from "sweetalert2";
import React from "react";
import { useParams } from "react-router-dom";
const UpdateForm = () => {
  const [singleProduct, singleProductLoading, refetch] = useSingleproduct();

  if (singleProductLoading) {
    return <>Loading...</>;
  }
  const {
    description,
    email,
    price,
    productName,
    quantity,
    sallerName,
    status,
    _id,
  } = singleProduct;

  const savedata = (e) => {
    e.preventDefault();
    const form = e.target;
    const productName = form.ProductName.value;
    const sallerName = form.sallername.value;
    const price = form.price.value;
    const quantity = form.quantity.value;
    const description = form.description.value;
    const data = {
      productName,
      sallerName,
      quantity: +quantity,
      price: +price,
      description,
    };
    axios
      .patch(`http://localhost:3000/update-product/${_id}`, data, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        if (res.data.modifiedCount === 1) {
          Swal.fire("successfuly updated", "", "success");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <form className="p-10" onSubmit={savedata}>
      <div>
        <label htmlFor="product-name" className="mr-5 uppercase">
          Product name
        </label>
        <br />
        <input
          type="text"
          name="ProductName"
          placeholder="Product-name"
          id="product-name"
          className="h-10 w-4/5 p-2 md:w-3/5"
          defaultValue={productName}
        />
      </div>
      <div>
        <label htmlFor="saller-name" className="mr-5 uppercase">
          saller name
        </label>
        <br />
        <input
          type="text"
          name="sallername"
          placeholder="SallerName"
          id="saller-name"
          className="h-10 w-4/5 p-2 md:w-3/5 "
          defaultValue={sallerName}
        />
      </div>

      <div>
        <label htmlFor="price" className="mr-5 uppercase">
          Price
        </label>
        <br />
        <input
          type="text"
          name="price"
          placeholder="Price"
          id="price"
          className="h-10 w-4/5 p-2 md:w-3/5"
          defaultValue={price}
        />
      </div>
      <div>
        <label htmlFor="quantity" className="mr-5 uppercase">
          Quantity
        </label>
        <br />
        <input
          type="text"
          name="quantity"
          placeholder="Quantity"
          id="quantity"
          className="h-10 w-4/5 p-2 md:w-3/5"
          defaultValue={quantity}
        />
      </div>
      <div>
        <label htmlFor="description" className="mr-5 uppercase">
          Description
        </label>
        <br />
        <textarea
          type="text"
          name="description"
          placeholder="Description"
          id="description"
          className="h-36 w-4/5 p-2 md:w-3/5"
          defaultValue={description}
        />
      </div>
      <input
        type="submit"
        value="Update"
        className="btn bg-orange-600 md:btn-wide"
      />
      <input
        type="reset"
        value="Reset"
        className="btn bg-orange-600 md:btn-wide"
      />
    </form>
  );
};

export default UpdateForm;
