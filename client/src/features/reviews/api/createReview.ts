import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";

export const createReview = async (productId: string, review: IReview) => {
  try {
    const response = await axios.post(`/reviews/${productId}`, review);
    return response?.data;
  } catch (error) {
    console.log(error);
  }
};

export const useCreateReview = (options: any) => {
  const { productId, closeModal } = options;

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (review: IReview) => createReview(productId, review),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reviews"] });
      toast.success("Review created successfully!");
      closeModal();
    },
  });
};
