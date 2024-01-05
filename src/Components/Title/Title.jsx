import React from "react";
const Title = ({ title, subtitle }) => {
  return (
    <>
      <h1 className="mb-5 text-center text-7xl font-medium">{title}</h1>
      <p className="text-center text-lg font-bold">{subtitle}</p>
    </>
  );
};

export default Title;
