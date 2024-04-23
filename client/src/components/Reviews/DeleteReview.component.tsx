import { ConfirmationDialog } from "@/components/Elements/ConfirmationDialog";
import { useUpdateOrder } from "@/features/orders/api/updateOrder";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import React, { useState } from "react";
import { useDeleteReview } from "@/features/reviews/api/deleteReview";

export const DeleteReview = (props: any) => {
  const { reviewId } = props;
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { isPending, mutate: deleteReviewMutation } =
    useDeleteReview(handleClose);

  const handleDelete = () => {
    deleteReviewMutation(reviewId);
    handleClose();
  };

  const DeleteButton = () => {
    return (
      <IconButton onClick={handleClickOpen}>
        <DeleteIcon />
      </IconButton>
    );
  };

  return (
    <ConfirmationDialog
      title={"Delete Review"}
      body={"Are you sure you want to delete your review?"}
      noText={"No"}
      yesText={"Yes"}
      open={open}
      DeleteButton={<DeleteButton />}
      handleDelete={handleDelete}
      handleClose={handleClose}
      isPending={isPending}
    />
  );
};
