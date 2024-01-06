import { Link } from "react-router-dom";
import useProduct from "../../Coustom Hook/useProduct";
import Title from "../Title/Title";
import React from "react";
const Products = () => {
  const [data, isLoading] = useProduct();
  console.log(data);
  if (isLoading) {
    return <>Loading</>;
  }

  return (
    <>
      <Title title="Product" subtitle="All products" />
      <div className="my-10 flex flex-col items-center gap-5 md:grid md:grid-cols-3">
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
