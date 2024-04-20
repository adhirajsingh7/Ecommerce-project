import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";

export const createReview = async (
  userId: string,
  productId: string,
  review: IReview
) => {
  try {
    const response = await axios.post(
      `/reviews/${userId}/${productId}`,
      review
    );
    return response?.data;
  } catch (error) {
    console.log(error);
  }
};

export const useCreateReview = (options: any) => {
  const { userId, productId, closeModal } = options;

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (review: IReview) => createReview(userId, productId, review),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reviews"] });
      toast.success("Review created successfully!");
      closeModal();
    },
  });
};
