import React from "react";
import ActiveLink from "./../ActiveNavLink/ActiveLink";
import useAdmin from "../../Coustom Hook/useAdmin";
import useSaller from "../../Coustom Hook/useSaller";

const DashBoard = () => {
  const [isAdmin, isAdminLOading] = useAdmin();
  const [isSaller, isSallerLoading] = useSaller();
  if (isAdminLOading || isSallerLoading) {
    return <>Loading....</>;
  }
  return (
    <div className="w-full">
      <div className="flex h-full flex-col items-center justify-center bg-red-500 p-5 text-left text-white ">
        <h1>DashBoard</h1>
        {isSaller ? (
          <ul className="flex flex-col gap-y-5">
            <h1 className="text-center">Saller</h1>
            <li className="">
              <ActiveLink>Home</ActiveLink>
            </li>
            <li>
              <ActiveLink href="/add-product">Add product</ActiveLink>
            </li>
            <li>
              <ActiveLink href="/all-my-post">My Product</ActiveLink>
            </li>
          </ul>
        ) : isAdmin ? (
          <ul className="flex flex-col gap-y-5">
            <h1 className="text-center">Admin</h1>
            <li className="">
              <ActiveLink>Home</ActiveLink>
            </li>
            <li>
              <ActiveLink href="/user-list">User control</ActiveLink>
            </li>
            <li>
              <ActiveLink href="/all-post">Post control Control</ActiveLink>
            </li>
          </ul>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default DashBoard;
