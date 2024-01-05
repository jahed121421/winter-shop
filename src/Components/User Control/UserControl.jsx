import axios from "axios";
import useUserData from "../../Coustom Hook/useUserData";
import Swal from "sweetalert2";
import Title from "../Title/Title";
import React from "react";
import { Trash } from "@phosphor-icons/react";
const UserControl = () => {
  const [userData, refetch, isLoading] = useUserData();
  if (isLoading) {
    return <>Loading....</>;
  }
  const MakeAdmin = (id) => {
    axios.put(`http://localhost:3000/make-admin/${id}`).then((res) => {
      if (res.data.modifiedCount === 1) {
        Swal.fire("success", "", "success");
        refetch();
      } else {
        Swal.fire("user already admin", "", "error");
      }
    });
  };
  const MakeSaller = (id) => {
    axios.put(`http://localhost:3000/make-saller/${id}`).then((res) => {
      if (res.data.modifiedCount === 1) {
        Swal.fire("success", "", "success");
        refetch();
      } else {
        Swal.fire("user already saller", "", "error");
      }
    });
  };
  const DeleteUser = (id) => {
    axios.delete(`http://localhost:3000/delete/${id}`).then((res) => {
      console.log(res.data);
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
                          ? "text-lg font-bold"
                          : "text-sm font-semibold"
                      }`}
                    >
                      Admin
                    </button>{" "}
                    ||
                    <button
                      onClick={() => MakeSaller(userDatas._id)}
                      className={`${
                        userDatas.role === "saller"
                          ? "text-lg font-bold"
                          : "text-sm font-semibold"
                      }`}
                    >
                      saller
                    </button>{" "}
                  </td>
                  <td>
                    <Trash
                      onClick={() => DeleteUser(userDatas._id)}
                      size={22}
                      className="cursor-pointer"
                    />
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

export default UserControl;
