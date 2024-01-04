import { Minus, Trash } from "@phosphor-icons/react";
import useCartData from "../../Coustom Hook/useCartData";
import axios from "axios";
import Swal from "sweetalert2";
import { Plus } from "@phosphor-icons/react/dist/ssr";
import React from "react";

const Cart = () => {
  const [cartData, cartLoading, refetch] = useCartData();

  if (cartLoading) {
    return <>Loading...</>;
  }
  const grandtotal = cartData
    .reduce((acc, cartData) => acc + cartData.priceperquentity, 0)
    .toFixed(2);

  const deletPost = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`http://localhost:3000/cart-data-delete/${id}`)
          .then((res) => refetch())
          .catch((err) => console.log(err));
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
      }
    });
  };
  const Increse = async (id, data) => {
    await axios
      .patch(`http://localhost:3000/increse-quantity/${id}`, data)
      .then((res) => refetch())
      .catch((err) => console.log(err));
  };
  const Decrese = async (id, data) => {
    await axios
      .patch(`http://localhost:3000/decrese-quantity/${id}`, data)
      .then((res) => {
        refetch();
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="bg-gray-100 h-screen py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-2xl font-semibold mb-4">Shopping Cart</h1>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="md:w-3/4">
            <div className="bg-white rounded-lg shadow-md p-6 mb-4">
              <table className="w-full">
                <thead>
                  <tr>
                    <th className="text-left font-semibold">Product</th>
                    <th className="text-left font-semibold">Price</th>
                    <th className="text-left font-semibold">Quantity</th>
                    <th className="text-left font-semibold">Total</th>
                    <th className="text-left font-semibold">Remove</th>
                  </tr>
                </thead>
                <tbody>
                  {cartData.map((cartDatas) => (
                    <tr key={cartDatas._id}>
                      <td className="py-4">
                        <div className="flex items-center">
                          <img
                            className="h-16 w-16 mr-4"
                            src={cartDatas.img}
                            alt="Product image"
                          />
                          <span className="font-semibold">
                            {cartDatas.productName}
                          </span>
                        </div>
                      </td>
                      <td className="py-4">${cartDatas.price}</td>
                      <td className="py-4">
                        <div className="flex items-center">
                          <button
                            onClick={
                              cartDatas.bag !== 1
                                ? () => Decrese(cartDatas._id, cartDatas)
                                : () => deletPost(cartDatas._id)
                            }
                            className="border rounded-md py-2 px-4 mr-2"
                          >
                            <Minus />
                          </button>
                          <span className="text-center w-8">
                            {cartDatas.bag}
                          </span>
                          <button
                            onClick={() => Increse(cartDatas._id, cartDatas)}
                            className="border rounded-md py-2 px-4 ml-2"
                          >
                            <Plus />
                          </button>
                        </div>
                      </td>
                      <td className="py-4">
                        ${cartDatas.priceperquentity.toFixed(2)}
                      </td>
                      <td className="py-4">
                        <Trash
                          onClick={() => deletPost(cartDatas._id)}
                          weight="bold"
                          size={24}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="md:w-1/4">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-lg font-semibold mb-4">Summary</h2>
              <div className="flex justify-between mb-2">
                <span>Subtotal</span>
                <span>${grandtotal}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Item</span>
                <span>{cartData.length}</span>
              </div>

              <hr className="my-2" />
              <div className="flex justify-between mb-2">
                <span className="font-semibold">Total</span>
                <span className="font-semibold">${grandtotal}</span>
              </div>
              <button className="bg-blue-500 text-white py-2 px-4 rounded-lg mt-4 w-full">
                Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
