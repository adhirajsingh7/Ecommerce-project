import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const fetchCart = async (options: any) => {
  const { userId } = options || {};
  try {
    const { data } = await axios.get(`/cart?user_id=${userId}`);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const useGetCart = (userId: string) => {
  return useQuery({
    queryKey: ["cart"],
    queryFn: () => fetchCart({ userId }),
  });
};
