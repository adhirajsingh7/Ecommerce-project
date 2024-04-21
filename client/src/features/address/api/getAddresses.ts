import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const fetchAddresses = async (options: any) => {
  const { page = 0, rowsPerPage: limit = 10 } = options || {};
  try {
    const { data } = await axios.get(`/addresses?page=${page}&limit=${limit}`);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const useGetAddresses = () => {
  return useQuery({
    queryKey: ["address"],
    queryFn: () => fetchAddresses({}),
  });
};
