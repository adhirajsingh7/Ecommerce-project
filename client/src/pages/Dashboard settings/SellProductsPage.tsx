import { Box, Stack, Typography } from "@mui/material";
import React from "react";
import SellProductsCardComponent from "../../components/Dashboard section/Sell Products components/SellProductsCard.component";
import { NewProductCard } from "../../components/Products section/Product card/NewProductCard.component";
import burgerImage from "../../assets/images/burger-image.jpg";

const SellProductsPage = () => {
  return (
    <Stack direction="row" gap={4} sx={{ height: 1, p: 4, bgcolor: "#F7F8FA" }}>
      <Typography variant="h4">SellProductsPage</Typography>
      <SellProductsCardComponent />
      <NewProductCard
        image={burgerImage}
        title={"ice cream"}
        discountedPrice={20}
        originalPrice={50}
      />
    </Stack>
  );
};

export default SellProductsPage;
