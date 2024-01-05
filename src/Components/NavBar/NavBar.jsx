import { Link } from "react-router-dom";
import ActiveLink from "../ActiveNavLink/ActiveLink";
import { useContext } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";
import { toast } from "react-toastify";
import React from "react";
const Menu = (
  <>
    <li>
      <ActiveLink href="/">Home</ActiveLink>
    </li>
    <li>
      <ActiveLink href="/products">Products</ActiveLink>
    </li>
    <li>
      <ActiveLink href="/register">Register</ActiveLink>
    </li>
    <li>
      <ActiveLink href="/cart">Cart</ActiveLink>
    </li>
    <li>
      <ActiveLink href="/dashboard">Dashboard</ActiveLink>
    </li>
  </>
);

const NavBar = () => {
  const { user, SignOut } = useContext(AuthContext);
  const LogOut = () => {
    SignOut()
      .then((res) => {
        toast("Logout successfully");
      })
      .catch((err) => console.log(err));
  };
  return (
    <>
      <div className="navbar bg-base-100">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu dropdown-content menu-sm z-[1] mt-3 w-52 rounded-box bg-base-100 p-2 shadow"
            >
              {Menu}
            </ul>
          </div>
          <Link to="/" className="btn btn-ghost text-xl">
            <img
              src="https://th.bing.com/th/id/OIP.zslm2GqxFGKrpjoWWW27RAHaHa?rs=1&pid=ImgDetMain"
              alt=""
              className="h-12 w-12"
            />
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{Menu}</ul>
        </div>
        {user ? (
          <div className="navbar-end">
            <button onClick={LogOut} className="btn">
              Logout
            </button>
          </div>
        ) : (
          <div className="navbar-end">
            <Link to="/login" className="btn">
              Login
            </Link>
          </div>
        )}
      </div>
    </>
  );
};

export default NavBar;
