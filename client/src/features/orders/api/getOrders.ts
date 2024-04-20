import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const fetchOrders = async (options: any) => {
  const {
    page = 0,
    rowsPerPage: limit = 5,
    // sortProducts: sortBy = "",
    userId,
  } = options || {};
  try {
    const { data } = await axios.get(
      `/orders?page=${page}&limit=${limit}&user_id=${userId}`
    );
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const useGetOrders = (options: any) => {
  const { page, rowsPerPage, userId } = options;
  return useQuery({
    queryKey: ["orders", { page, rowsPerPage, userId }],
    queryFn: () => fetchOrders({ page, rowsPerPage, userId }),
  });
};
