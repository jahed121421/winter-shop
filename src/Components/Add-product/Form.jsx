import { useContext } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";
import axios from "axios";
import Swal from "sweetalert2";
import React from "react";

const Form = () => {
  const { user } = useContext(AuthContext);

  const savedata = async (e) => {
    e.preventDefault();
    const form = e.target;
    const ProductName = form.ProductName.value;
    const SallerName = form.sallername.value;
    const price = form.price.value;
    const quantity = form.quantity.value;
    const description = form.description.value;
    const photo = form.photo.files[0];
    const formData = new FormData();
    formData.append("image", photo);
    await axios
      .post(
        "https://api.imgbb.com/1/upload?key=7648e128c857ca1a38a7eecbb0ff0624",
        formData
      )
      .then((res) => {
        if (res) {
          const img = res.data.data.display_url;
          const data = {
            productName: ProductName,
            sallerName: SallerName,
            quantity: +quantity,
            price: +price,
            description,
            email: user.email,
            status: "pending",
            img: img,
          };
          axios
            .post("http://localhost:3000/save-data", data, {
              headers: {
                authoraization: `Bearer ${localStorage.getItem("token")}`,
              },
            })
            .then((res) => {
              if (res.data.acknowledged) {
                Swal.fire("successfuly posted", "", "success");
                form.reset();
              }
            })
            .catch((err) => console.log(err));
        }
      });
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
          className="md:w-3/5 w-4/5 h-10 p-2"
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
          className="md:w-3/5 w-4/5 h-10 p-2"
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
          className="md:w-3/5 w-4/5 h-10 p-2"
        />
      </div>
      <div>
        <label htmlFor="photo" className="mr-5 uppercase">
          Photo
        </label>
        <br />
        <input
          type="file"
          name="photo"
          placeholder="Photo"
          id="photo"
          className="md:w-3/5 w-4/5 h-10 p-2"
          accept="image/*"
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
          className="md:w-3/5 w-4/5 h-10 p-2"
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
          className="md:w-3/5 w-4/5 h-36 p-2"
        />
      </div>
      <input
        type="submit"
        value="Save"
        className="btn md:btn-wide bg-orange-600"
      />
      <input
        type="reset"
        value="Reset"
        className="btn md:btn-wide bg-orange-600"
      />
    </form>
  );
};

export default Form;
