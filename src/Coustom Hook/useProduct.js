import { useQuery } from "@tanstack/react-query";

const useProduct = () => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await fetch("http://localhost:3000/all-data", {
        headers: {
          authoraization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      return res.json();
    },
  });

  return [data, isLoading, refetch];
};

export default useProduct;
