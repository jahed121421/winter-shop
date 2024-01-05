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
    <div className="h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <h1 className="mb-4 text-2xl font-semibold">Shopping Cart</h1>
        <div className="flex flex-col gap-4 md:flex-row">
          <div className="md:w-3/4">
            <div className="mb-4 rounded-lg bg-white p-6 shadow-md">
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
                            className="mr-4 h-16 w-16"
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
                            className="mr-2 rounded-md border px-4 py-2"
                          >
                            <Minus />
                          </button>
                          <span className="w-8 text-center">
                            {cartDatas.bag}
                          </span>
                          <button
                            onClick={() => Increse(cartDatas._id, cartDatas)}
                            className="ml-2 rounded-md border px-4 py-2"
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
            <div className="rounded-lg bg-white p-6 shadow-md">
              <h2 className="mb-4 text-lg font-semibold">Summary</h2>
              <div className="mb-2 flex justify-between">
                <span>Subtotal</span>
                <span>${grandtotal}</span>
              </div>
              <div className="mb-2 flex justify-between">
                <span>Item</span>
                <span>{cartData.length}</span>
              </div>

              <hr className="my-2" />
              <div className="mb-2 flex justify-between">
                <span className="font-semibold">Total</span>
                <span className="font-semibold">${grandtotal}</span>
              </div>
              <button className="mt-4 w-full rounded-lg bg-blue-500 px-4 py-2 text-white">
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
