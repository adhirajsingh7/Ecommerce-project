import { Box, Button, Stack, Typography } from "@mui/material";
import React from "react";
import demoImage from "../../../assets/images/icecream-image.jpg";
import "./SellProductsCard.styles.scss";

const SellProductsCardComponent = () => {
  return (
    <Stack
      className="card-container"
      direction="column"
      sx={{
        height: "380px",
        width: "300px",
        borderRadius: "25px",
        bgcolor: "white",
      }}
    >
      <img
        className="card-image"
        src={demoImage}
        alt=""
        style={{
          maxHeight: "50%",
          width: "100%",
          overflow: "hidden",
          objectFit: "cover",
          borderRadius: "25px 25px 0 0",
        }}
      />
      <Stack direction="column" sx={{ p: 2 }} gap={1}>
        <Typography variant="h5" fontWeight={600}>
          Vanila ice cream
        </Typography>
        <Typography variant="body1">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Inventore
        </Typography>
        <Stack
          direction="row"
          justifyContent="flex-start"
          alignItems="center"
          gap={2}
        >
          <Typography variant="h4" fontWeight={600}>
            $10
          </Typography>
          <Button variant="contained" color="warning">
            Add to cart
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default SellProductsCardComponent;
