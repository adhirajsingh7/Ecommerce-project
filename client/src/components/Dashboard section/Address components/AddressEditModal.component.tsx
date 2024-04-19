import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import AddIcon from "@mui/icons-material/Add";
import { AddressFormComponent } from "./AddressForm.component";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  //   width: 400,
  bgcolor: "white",
  boxShadow: 24,
  p: 4,
};

const AddressEditModalComponent = (address: any) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  //   console.log(address);

  return (
    <>
      <Button sx={{ textTransform: "none" }} onClick={handleOpen}>
        Edit
      </Button>
      <Modal
        sx={{
          "& > .MuiBackdrop-root": {
            backdropFilter: "blur(4px)",
          },
        }}
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <AddressFormComponent address={address} closeModal={handleClose} />
        </Box>
      </Modal>
    </>
  );
};

export default AddressEditModalComponent;
