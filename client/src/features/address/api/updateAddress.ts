import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";

export const updateAddress = async (
  addressId: string | undefined,
  address: any
) => {
  try {
    const { data } = await axios.put(`/addresses/${addressId}`, address);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const useUpdateAddress = (addressId: string | undefined) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (updatedAddress) => updateAddress(addressId, updatedAddress),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["address"] });
      toast.success("Address updated succesfully");
    },
  });
};
