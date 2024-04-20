import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";

export const deleteReview = async (reviewId: string) => {
  try {
    const { data } = await axios.delete(`/reviews/${reviewId}`);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const useDeleteReview = (reviewId, closeModal) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (review: IReview) => deleteReview(reviewId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reviews"] });
      toast.success("Review deleted successfully!");
      closeModal();
    },
  });
};
