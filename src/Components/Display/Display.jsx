import { Outlet } from "react-router-dom";
import NavBar from "../NavBar/NavBar";
import Footer from "../Footer/Footer";
import React from "react";

const Display = () => {
  return (
    <div>
      <NavBar />
      <div className="mx-10 h-full">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Display;
