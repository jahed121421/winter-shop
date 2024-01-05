import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

const useSingleProduct = () => {
  const { id } = useParams();
  const {
    data: singleProduct,
    isLoading: singleProductLoading,
    refetch,
  } = useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      const res = await fetch(`http://localhost:3000/singleproduct/${id}`, {
        headers: {
          authoraization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = res.json();
      return data;
    },
  });

  return [singleProduct, singleProductLoading, refetch];
};

export default useSingleProduct;
