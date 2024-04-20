import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const createOrder = async (order: any) => {
  try {
    const response = await axios.post(`/orders/`, order);
    return response?.data;
  } catch (error) {
    console.log(error);
  }
};

export const useCreateOrder = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (order) => createOrder(order),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["orders", "cart", "products"],
      });
      navigate("/");
      toast.success("Order placed successfully!");
    },
  });
};
