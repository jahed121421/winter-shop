import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../AuthProvider/AuthProvider";
import React from "react";
import useSaller from "./../../Coustom Hook/useSaller";
const isSaller = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const { isSaller } = useSaller();

  const location = useLocation();
  if (loading) {
    return <>Loading...</>;
  }
  if (user && isSaller) {
    return children;
  } else {
    return <Navigate to="/login" replace={true} state={{ from: location }} />;
  }
};

export default isSaller;
