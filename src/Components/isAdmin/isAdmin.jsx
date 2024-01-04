import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../AuthProvider/AuthProvider";
import React from "react";
import useAdmin from "./../../Coustom Hook/useAdmin";
const isAdmin = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const { isAdmin } = useAdmin();

  const location = useLocation();
  if (loading) {
    return <>Loading...</>;
  }
  if (user && isAdmin) {
    return children;
  } else {
    return <Navigate to="/login" replace={true} state={{ from: location }} />;
  }
};

export default isAdmin;
