import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const fetchCart = () => {
  return axios.get("/cart");
  // try {
  //   const { data } = await axios.get("/cart");
  //   return data;
  // } catch (error) {
  //   console.log(error);
  // }
};

export const useGetCart = () => {
  return useQuery({
    queryKey: ["cart"],
    queryFn: () => fetchCart(),
  });
};
