import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";

export const updateOrder = async (orderId: string, order: any) => {
  try {
    const { data } = await axios.put(`/orders/${orderId}`, order);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const useUpdateOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ orderId, orderStatus }) => updateOrder(orderId, orderStatus),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["orders"],
      });
      toast.success("Order cancelled successfully!");
    },
  });
};
