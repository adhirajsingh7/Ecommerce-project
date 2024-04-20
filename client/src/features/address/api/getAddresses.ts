import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const fetchAddresses = async (options: any) => {
  const { page = 0, rowsPerPage: limit = 10, userId = "" } = options || {};
  try {
    const { data } = await axios.get(
      `/addresses?page=${page}&limit=${limit}&user_id=${userId}`
    );
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const useGetAddresses = (userId: string) => {
  return useQuery({
    queryKey: ["address"],
    queryFn: () => fetchAddresses({ userId }),
  });
};
