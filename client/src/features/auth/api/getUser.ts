import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const fetchUser = () => {
  return axios.get("/login/success");
};

export const useGetUser = () => {
  return useQuery({
    queryKey: ["users"],
    queryFn: () => fetchUser(),
  });
};
