import { Link } from "react-router-dom";
import useProduct from "../../Coustom Hook/useProduct";
import Title from "../Title/Title";
import React from "react";
const Products = () => {
  const [data, isLoading] = useProduct();

  if (isLoading) {
    return <>Loading</>;
  }

  return (
    <>
      <Title title="Product" subtitle="All products" />
      <div className="md:grid md:grid-cols-3 flex flex-col gap-5 items-center my-10">
        {data.map((products, i) => (
          <div key={i} className="card w-96 bg-base-100 shadow-xl ">
            <figure>
              <img src={products.img} alt="Shoes" />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{products.productName}</h2>
              <p>{products.description}</p>
              <div className="card-actions justify-end">
                <Link to={`/product/${products._id}`}>
                  <button className="btn btn-primary">Details</button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Products;
