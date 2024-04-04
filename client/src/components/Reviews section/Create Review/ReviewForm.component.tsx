import { Box, Button, Rating, Stack, Typography } from "@mui/material";
import React from "react";
import FormInputText from "../../Form components/FormInputText";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TReviewSchema, reviewSchema } from "../../../lib/type";
import { LoadingButton } from "@mui/lab";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createReview } from "../../../api/review.api";
import FormRating from "../../Form components/FormRating";
import { useParams } from "react-router-dom";

const ReviewFormComponent = (props: any) => {
  const { title, closeModal, setSearch, setPage } = props;
  const queryClient = useQueryClient();
  const params = useParams();
  const userId = "660bb49b0dab0c997ac74071";
  const productId = params?.product_id || "";
  console.log(productId);

  const { isPending, isError, error, mutate } = useMutation({
    mutationFn: (review: IReview) => createReview(userId, productId, review),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reviews"] });
      closeModal();
      reset();
    },
  });

  const defaultValues = {
    title: "",
    content: "",
    rating: 3,
  };

  const {
    register,
    handleSubmit,
    watch,
    control,
    reset,
    formState: { errors },
  } = useForm<TReviewSchema>({
    defaultValues,
    resolver: zodResolver(reviewSchema),
  });

  const onSubmit: SubmitHandler<any> = async (data) => {
    console.log(data);
    mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack direction="column" gap={2} sx={{ width: "400px" }}>
        <Typography variant="h4">Write a review</Typography>
        <FormInputText
          type="text"
          name={"title"}
          control={control}
          label={"Title"}
        />
        <FormInputText
          type="text"
          name={"content"}
          control={control}
          label={"Review"}
          multiline={true}
          rows={4}
        />
        <FormRating name={"rating"} control={control} />
        <Stack direction="row" justifyContent="space-between" sx={{ mt: 2 }}>
          <Button variant="outlined" onClick={() => closeModal()}>
            Cancel
          </Button>
          <LoadingButton
            type="submit"
            loading={isPending}
            loadingPosition="center"
            variant="contained"
          >
            Create review
          </LoadingButton>
        </Stack>
      </Stack>
    </form>
  );
};

export default ReviewFormComponent;
