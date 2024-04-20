import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export const updateCart = async (cartId: string, updatedProduct: any) => {
  try {
    const { data } = await axios.put(`/cart/${cartId}`, updatedProduct);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const useUpdateCart = (cartId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (updatedProduct) => updateCart(cartId, updatedProduct),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });
};
