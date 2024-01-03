import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useUserData = () => {
  const {
    data: userData,
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const res = await axios.get("http://localhost:3000/user-data");
      return res.data;
    },
  });

  return [userData, refetch, isLoading];
};

export default useUserData;
