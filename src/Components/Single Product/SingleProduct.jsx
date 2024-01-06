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
    <div className="bg-blue-100 py-8 text-white dark:bg-blue-600">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="-mx-4 flex flex-col md:flex-row">
          <div className="px-4 md:flex-1">
            <div className="mb-4 h-[460px] rounded-lg bg-blue-300 dark:bg-blue-700">
              <img
                className="h-full w-full object-cover"
                src={img}
                alt="Product Image"
              />
            </div>
            <div className="-mx-2 mb-4 flex">
              <div className="w-1/2 px-2">
                <button
                  onClick={AddtoCart}
                  disabled={quantity == 0}
                  className="w-full rounded-full bg-blue-900 px-4 py-2 font-bold text-white hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
          <div className="px-4 md:flex-1">
            <h2 className="mb-2 text-2xl font-bold text-blue-600 dark:text-white">
              {productName}
            </h2>
            <p className="mb-4 text-sm text-blue-600 dark:text-blue-300">
              {sellerName}
            </p>
            <div className="mb-4 flex">
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
                  {quantity == 0 ? "OUT OF STOCK" : quantity}
                </span>
              </div>
            </div>
            <div>
              <span className="font-bold text-gray-700 dark:text-gray-300">
                Product Description:
              </span>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
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
