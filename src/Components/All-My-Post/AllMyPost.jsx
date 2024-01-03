import React from "react";
import Title from "../Title/Title";
import useMyPost from "./../../Coustom Hook/useMyPost";
import { Trash } from "@phosphor-icons/react/dist/ssr";
import axios from "axios";
import Swal from "sweetalert2";
import { Upload } from "@phosphor-icons/react";
import { Link } from "react-router-dom";

const AllMyPost = () => {
  const [ownData, isLoading, refetch] = useMyPost();
  if (isLoading) {
    return <>Loading....</>;
  }
  const Delete = (id) => {
    axios
      .delete(`http://localhost:3000/delete/${id}`)
      .then((res) => {
        if (res.data.deletedCount) {
          Swal.fire("successfuly delete", "", "success");
          refetch();
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <>
      <Title title="My All Post" />
      <div className="overflow-x-auto">
        <table className="table table-xs table-pin-rows table-pin-cols">
          <thead>
            <tr>
              <th></th>
              <td>Name</td>
              <td>Name</td>
              <td>company</td>
              <td>location</td>
              <td>Last Login</td>
              <td>Favorite Color</td>
            </tr>
          </thead>
          <tbody>
            {ownData.map((ownalldatas, i) => (
              <tr key={ownalldatas._id}>
                <th>{i + 1}</th>
                <td>{ownalldatas.productName}</td>
                <td>{ownalldatas.message}</td>
                <td>{ownalldatas.status}</td>
                <td>{ownalldatas.price}</td>
                <td>
                  <Link to={`/update-product/${ownalldatas._id}`}>
                    <Upload size={20} weight="bold" />
                  </Link>
                </td>
                <td>
                  <button
                    onClick={() => Delete(ownalldatas._id)}
                    className="text-center"
                  >
                    <Trash size={20} weight="bold" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default AllMyPost;
