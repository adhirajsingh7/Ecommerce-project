import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";

export const deleteReview = (reviewId: string) => {
  return axios.delete(`/reviews/${reviewId}`);
};

export const useDeleteReview = (closeModal) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (reviewId: string) => deleteReview(reviewId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reviews"] });
      toast.success("Review deleted successfully!");
      closeModal();
    },
  });
};
