import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";

export const updateReview = (reviewId: string, review: any) => {
  return axios.put(`/reviews/${reviewId}`, review);
};

export const useUpdateReview = (reviewId, updatedReview, closeModal) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (review: IReview) => updateReview(reviewId, updatedReview),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reviews"] });
      toast.success("Review updated successfully!");
      closeModal();
    },
  });
};
