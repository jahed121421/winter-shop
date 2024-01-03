import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../Components/AuthProvider/AuthProvider";

const useCartData = () => {
  const { user } = useContext(AuthContext);

  const {
    data: cartData,
    isLoading: cartLoading,
    refetch,
  } = useQuery({
    queryKey: ["cart", user?.email],
    queryFn: async () => {
      const res = await fetch(`http://localhost:3000/cart/${user.email}`);
      return res.json();
    },
  });
  return [cartData, cartLoading, refetch];
};

export default useCartData;
