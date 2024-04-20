import { ConfirmationDialog } from "@/components/Elements/ConfirmationDialog";
import { useDeleteAddress } from "@/features/address/api/deleteAddress";
import { Button } from "@mui/material";
import React from "react";

export const DeleteAddress = (props: any) => {
  const { addressId } = props;
  const [open, setOpen] = React.useState(false);

  const { mutate: deleteAddressMutation } = useDeleteAddress();

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleDelete = () => {
    deleteAddressMutation(addressId);
    handleClose();
  };

  const DeleteButton = () => {
    return (
      <Button
        color="error"
        sx={{ textTransform: "none" }}
        onClick={() => handleClickOpen()}
      >
        Delete
      </Button>
    );
  };

  return (
    <ConfirmationDialog
      title={"Confirm Delete"}
      body={"Are you sure you want to delete your address?"}
      noText={"Cancel"}
      yesText={"Delete"}
      open={open}
      DeleteButton={<DeleteButton />}
      handleDelete={handleDelete}
      handleClose={handleClose}
    />
  );
};
