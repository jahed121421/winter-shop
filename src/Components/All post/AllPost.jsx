import useProduct from "../../Coustom Hook/useProduct";
import Title from "../Title/Title";
import React, { useState } from "react";
import Model from "./Model";
import axios from "axios";

const AllPost = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [id, setId] = useState("");
  const [data, isLoading, refetch] = useProduct();

  if (isLoading) {
    return <>Loading...</>;
  }
  const Approved = (id) => {
    axios.put(`http://localhost:3000/approved/${id}`).then((res) => {
      refetch();
    });
  };

  return (
    <>
      <Title title="All Post" />
      <div className="overflow-x-auto">
        <table className="table table-xs table-pin-rows table-pin-cols capitalize">
          <thead>
            <tr>
              <th>Serial</th>
              <td>Name</td>
              <td>Seller Name</td>
              <td>Price</td>
              <td>Status</td>
              <td>Message</td>
              <td>Decline</td>
              <td>Approve</td>
            </tr>
          </thead>
          <tbody>
            {data.map((allProducts, i) => (
              <tr key={allProducts._id}>
                <th>{i + 1}</th>
                <td>{allProducts.productName}</td>
                <td>{allProducts.sellerName}</td>
                <td>${allProducts.price}</td>
                <td
                  className={`${
                    allProducts.status === "approved"
                      ? "bg-green-500"
                      : "bg-red-500"
                  } text-center`}
                >
                  {allProducts.status}
                </td>
                <td>{allProducts.reason}</td>
                <td>
                  <button
                    onClick={() => {
                      setIsOpen(true), setId(allProducts._id);
                    }}
                  >
                    Decline
                  </button>
                </td>
                <td>
                  <button onClick={() => Approved(allProducts._id)}>
                    APPROVE
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Model isOpen={isOpen} setIsOpen={setIsOpen} id={id} refetch={refetch} />
    </>
  );
};

export default AllPost;
