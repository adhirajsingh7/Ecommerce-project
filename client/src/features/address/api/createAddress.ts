import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export const createAddress = async (userId: string, address: any) => {
  try {
    const response = await axios.post(`/addresses/${userId}`, address);
    return response?.data;
  } catch (error) {
    console.log(error);
  }
};

export const useCreateAddress = (userId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (address) => createAddress(userId, address),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["address"] });
    },
  });
};
