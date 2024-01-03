import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

const useSingleproduct = () => {
  const { id } = useParams();

  const {
    data: singleProduct,
    isLoading: singleProductLoading,
    refetch,
  } = useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      const res = await fetch(`http://localhost:3000/singleproduct/${id}`);
      return res.json();
    },
  });
  return [singleProduct, singleProductLoading, refetch];
};

export default useSingleproduct;
