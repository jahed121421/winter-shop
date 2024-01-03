import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../Components/AuthProvider/AuthProvider";
import axios from "axios";

const useMyPost = () => {
  const { user } = useContext(AuthContext);
  const {
    data: ownData,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["myownpost", user?.email],
    queryFn: async () => {
      const res = await axios.get(
        `http://localhost:3000/my-data/${user.email}`
      );
      return res.data;
    },
  });
  return [ownData, isLoading, refetch];
};

export default useMyPost;
