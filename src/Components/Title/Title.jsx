import React from "react";
const Title = ({ title, subtitle }) => {
  return (
    <>
      <h1 className="text-center text-7xl font-medium mb-5">{title}</h1>
      <p className="text-center text-lg font-bold">{subtitle}</p>
    </>
  );
};

export default Title;
