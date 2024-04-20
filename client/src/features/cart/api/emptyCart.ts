import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export const EmptyCart = async (cartId: string) => {
  try {
    const { data } = await axios.delete(`/cart/${cartId}`);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const useEmptyCart = (cartId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => EmptyCart(cartId),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      console.log(data);
    },
  });
};
