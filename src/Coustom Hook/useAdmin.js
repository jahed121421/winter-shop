import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "./../Components/AuthProvider/AuthProvider";

const useAdmin = () => {
  const { user, loading } = useContext(AuthContext);
  const {
    data: isAdmin,
    refetch,
    isLoading: isAdminLoading,
  } = useQuery({
    queryKey: ["isAdmin", user?.email],
    enabled: !loading,
    queryFn: async () => {
      const res = await axios.get(
        `http://localhost:3000/check-admin/${user?.email}`
      );

      return res.data.admin;
    },
  });
  return [isAdmin, isAdminLoading, refetch];
};

export default useAdmin;
