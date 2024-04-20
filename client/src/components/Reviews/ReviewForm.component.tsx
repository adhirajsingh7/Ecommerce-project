import React from "react";
import { Button, Stack, Typography } from "@mui/material";
import { FormInputText } from "../Form/FormInputText";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoadingButton } from "@mui/lab";
import { FormRating } from "../Form/FormRating";
import { useParams } from "react-router-dom";
import { useCreateReview } from "@/features/reviews/api/createReview";
import { TReviewSchema, reviewSchema } from "@/lib/type";

export const ReviewFormComponent = (props: any) => {
  const { closeModal } = props;

  const params = useParams();
  const userId = JSON.parse(localStorage.getItem("userId") || "");
  const productId = params?.product_id || "";

  const { isPending, mutate: createReviewMutation } = useCreateReview({
    userId,
    productId,
    closeModal,
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
    createReviewMutation(data);
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
