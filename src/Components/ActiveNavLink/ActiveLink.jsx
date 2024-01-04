import { NavLink } from "react-router-dom";
import React from "react";
const ActiveLink = ({ children, href, end }) => {
  return (
    <NavLink
      to={href}
      end={end}
      className={({ isActive }) =>
        `${
          isActive ? "  font-bold border-b-2 border-blue-700" : ""
        } rounded-none mx-2`
      }
    >
      {children}
    </NavLink>
  );
};

export default ActiveLink;
