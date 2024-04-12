import { Box, Button, Stack, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import React from "react";
import AddressCardComponent from "../../components/Dashboard section/Address components/AddressCard.component";
import AddressModalComponent from "../../components/Dashboard section/Address components/AddressModal.component";

const AddressPage = () => {
  return (
    <Stack direction="column" sx={{ p: 2, width: 1 }} gap={2}>
      <Typography variant="h5">AddressPage</Typography>
      <Stack direction="row" justifyContent="flex-end" sx={{ width: 1 }}>
        <AddressModalComponent />
      </Stack>
      <Stack direction="row">
        <AddressCardComponent />
      </Stack>
      <Stack direction="row" gap={2}></Stack>
    </Stack>
  );
};

export default AddressPage;
