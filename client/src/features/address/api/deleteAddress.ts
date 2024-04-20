import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import axios from "axios";

export const deleteAddress = async (addressId: string) => {
  try {
    const { data } = await axios.delete(`/addresses/${addressId}`);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const useDeleteAddress = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (addressId: string) => deleteAddress(addressId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["address"] });
      toast.success("Address deleted succesfully");
    },
  });
};
