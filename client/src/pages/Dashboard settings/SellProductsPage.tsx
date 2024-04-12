import { Box, Stack, Typography } from "@mui/material";
import React from "react";
import SellProductsCardComponent from "../../components/Dashboard section/Sell Products components/SellProductsCard.component";

const SellProductsPage = () => {
  return (
    <Stack
      direction="column"
      gap={4}
      sx={{ height: 1, p: 4, bgcolor: "#F7F8FA" }}
    >
      <Typography variant="h4">SellProductsPage</Typography>
      <SellProductsCardComponent />
    </Stack>
  );
};

export default SellProductsPage;
