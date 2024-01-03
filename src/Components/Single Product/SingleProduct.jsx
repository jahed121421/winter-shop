import axios from "axios";
import useSingleproduct from "../../Coustom Hook/useSingleproduct";
import { useContext } from "react";
import { AuthContext } from "./../AuthProvider/AuthProvider";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import React from "react";
const SingleProduct = () => {
  const [singleProduct, singleProductLoading] = useSingleproduct();
  const { user } = useContext(AuthContext);

  if (singleProductLoading) {
    return <>Loading...</>;
  }
  const { _id, img, productName, sellerName, price, description, quantity } =
    singleProduct;
  const data = {
    img,
    productName,
    price,
    menuId: _id,
    email: user.email,
    bag: +1,
    priceperquentity: +price,
  };

  const AddtoCart = () => {
    axios
      .post("http://localhost:3000/addtocart", data)
      .then((res) => {
        if (res.data.acknowledged) {
          Swal.fire("Successfuly Added ", "", "success");
        } else {
          toast(`${res.data.message}`);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="bg-blue-100 dark:bg-blue-600 py-8 text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row -mx-4">
          <div className="md:flex-1 px-4">
            <div className="h-[460px] rounded-lg bg-blue-300 dark:bg-blue-700 mb-4">
              <img
                className="w-full h-full object-cover"
                src={img}
                alt="Product Image"
              />
            </div>
            <div className="flex -mx-2 mb-4">
              <div className="w-1/2 px-2">
                <button
                  onClick={AddtoCart}
                  className="w-full bg-blue-900 dark:bg-blue-600 text-white py-2 px-4 rounded-full font-bold hover:bg-blue-800 dark:hover:bg-blue-700"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
          <div className="md:flex-1 px-4">
            <h2 className="text-2xl font-bold text-blue-600 dark:text-white mb-2">
              {productName}
            </h2>
            <p className="text-blue-600 dark:text-blue-300 text-sm mb-4">
              {sellerName}
            </p>
            <div className="flex mb-4">
              <div className="mr-4">
                <span className="font-bold text-gray-700 dark:text-gray-300">
                  Price:
                </span>
                <span className="text-gray-600 dark:text-gray-300">
                  ${price}
                </span>
              </div>
              <div>
                <span className="font-bold text-gray-700 dark:text-gray-300">
                  Quantity:{" "}
                </span>
                <span className="text-gray-600 dark:text-gray-300">
                  {quantity}
                </span>
              </div>
            </div>
            <div>
              <span className="font-bold text-gray-700 dark:text-gray-300">
                Product Description:
              </span>
              <p className="text-gray-600 dark:text-gray-300 text-sm mt-2">
                {description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
