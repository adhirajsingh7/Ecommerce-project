import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import axios from "axios";

export const updateAddress = (addressId: string | undefined, address: any) => {
  return axios.put(`/addresses/${addressId}`, address);
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
