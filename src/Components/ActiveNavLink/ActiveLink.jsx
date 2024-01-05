import { NavLink } from "react-router-dom";
import React from "react";
const ActiveLink = ({ children, href, end }) => {
  return (
    <NavLink
      to={href}
      end={end}
      className={({ isActive }) =>
        `${
          isActive ? "  border-b-2 border-blue-700 font-bold" : ""
        } mx-2 rounded-none`
      }
    >
      {children}
    </NavLink>
  );
};

export default ActiveLink;
