import { Box, Stack, Typography } from "@mui/material";
import React from "react";
import SellProductsCardComponent from "../../components/Dashboard section/Sell Products components/SellProductsCard.component";
import burgerImage from "../../assets/images/burger-image.jpg";

const SellProductsPage = () => {
  return (
    <Stack direction="row" gap={4} sx={{ height: 1, p: 4, bgcolor: "#F7F8FA" }}>
      <Typography variant="h4">SellProductsPage</Typography>
      <SellProductsCardComponent />
    </Stack>
  );
};

export default SellProductsPage;
