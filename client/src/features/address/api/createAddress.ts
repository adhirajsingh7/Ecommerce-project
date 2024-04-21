import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";

export const createAddress = async (address: any) => {
  try {
    const response = await axios.post("/addresses", address);
    return response?.data;
  } catch (error) {
    console.log(error);
  }
};

export const useCreateAddress = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (address) => createAddress(address),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["address"] });
      toast.success("Address added succesfully");
    },
  });
};
