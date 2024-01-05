import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "./../Components/AuthProvider/AuthProvider";

const useSaller = () => {
  const { user, loading } = useContext(AuthContext);
  const {
    data: isSaller,
    refetch,
    isLoading: isSallerLoading,
  } = useQuery({
    queryKey: ["isSaller", user?.email],
    enabled: !loading,
    queryFn: async () => {
      const res = await axios.get(
        `http://localhost:3000/check-saller/${user?.email}`,
      );

      return res.data.saller;
    },
  });
  return [isSaller, isSallerLoading, refetch];
};

export default useSaller;
