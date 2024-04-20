import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

export const ConfirmationDialog = (props: any) => {
  const {
    title,
    body,
    open,
    DeleteButton,
    handleDelete,
    handleClose,
    noText,
    yesText,
  } = props;
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <React.Fragment>
      {DeleteButton}
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
        sx={{
          "& > .MuiBackdrop-root": {
            backdropFilter: "blur(4px)",
          },
        }}
      >
        <DialogTitle id="responsive-dialog-title">{title}</DialogTitle>
        <DialogContent>
          <DialogContentText>{body}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus color="inherit" onClick={handleClose}>
            {noText}
          </Button>
          <Button onClick={handleDelete} autoFocus>
            {yesText}
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};
