import React from "react";
import { ModalComponent } from "@/components/Elements/Modal";
import { Button } from "@mui/material";
import { ProductForm } from "./ProductForm.component";

export const CreateProduct = (props: any) => {
  const { setSearch, setPage } = props;
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const ModalButton = () => {
    return (
      <Button variant="contained" onClick={handleOpen}>
        Add Product
      </Button>
    );
  };

  return (
    <>
      <ModalComponent
        open={open}
        handleClose={handleClose}
        ModalButton={<ModalButton />}
      >
        <ProductForm
          setSearch={setSearch}
          setPage={setPage}
          closeModal={handleClose}
        />
      </ModalComponent>
    </>
  );
};
