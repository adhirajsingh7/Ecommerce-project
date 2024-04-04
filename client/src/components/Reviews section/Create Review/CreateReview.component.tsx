import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { IconButton, styled } from "@mui/material";
import ReviewFormComponent from "./ReviewForm.component";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  //   width: 400,
  bgcolor: "white",
  boxShadow: 24,
  p: 6,
};

const CreateReviewComponent = (product: any) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Button variant="outlined" onClick={handleOpen}>
        Write a review
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
          <ReviewFormComponent
            title={"Edit"}
            product={product}
            closeModal={handleClose}
          />
        </Box>
      </Modal>
    </>
  );
};

export default CreateReviewComponent;
