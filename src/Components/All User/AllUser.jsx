import axios from "axios";
import useUserData from "../../Coustom Hook/useUserData";
import Title from "../Title/Title";
import Swal from "sweetalert2";
import React from "react";
import { Trash } from "@phosphor-icons/react/dist/ssr";

const AllUser = () => {
  const [userData, refetch, isLoading] = useUserData();
  if (isLoading) {
    return <>Loading....</>;
  }
  const MakeAdmin = (id) => {
    axios.put(`http://localhost:3000/make-admin/${id}`).then((res) => {
      Swal.fire("success", "", "success");
      refetch();
    });
  };
  return (
    <>
      <Title title="User" />
      <div>
        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                <th>serial</th>
                <th>Email</th>
                <th>Role</th>
                <th>Action</th>
                <th>Admin</th>
              </tr>
            </thead>
            <tbody>
              {userData.map((userDatas, i) => (
                <tr key={userDatas._id} className="bg-base-200">
                  <th>{i + 1}</th>
                  <th>{userDatas.email}</th>
                  <td>{userDatas.role}</td>
                  <td className="flex gap-3">
                    <button
                      onClick={() => MakeAdmin(userDatas._id)}
                      className={`${
                        userDatas.role === "admin"
                          ? "font-bold"
                          : "font-semibold"
                      }`}
                    >
                      Admin
                    </button>{" "}
                    ||
                    <button
                      className={`${
                        userDatas.role === "saller"
                          ? "font-bold text-lg"
                          : "font-semibold"
                      }`}
                    >
                      saller
                    </button>{" "}
                  </td>
                  <td>
                    <Trash />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default AllUser;
