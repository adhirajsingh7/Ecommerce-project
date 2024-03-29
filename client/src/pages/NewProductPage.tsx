import React from "react";
import { Box, Button, Divider, Rating, Stack, Typography } from "@mui/material";
import productImage from "../assets/images/colorful-summer-treat-melting-ice-cream-generative-ai.jpg";

const NewProductPage = () => {
  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="center"
      gap={8}
      sx={{ height: "100vh", width: 1 }}
    >
      <img
        src={productImage}
        alt=""
        style={{
          height: "600px",
          width: "600px",
          objectFit: "contain",
          //   border: "1px solid black",
          borderRadius: "10%",
          backgroundColor: "#f5f6f6",
        }}
      />
      <Stack direction="column" gap={2} sx={{ p: 2, width: 1 / 2 }}>
        <Typography variant="h2">title</Typography>
        <Typography variant="body1">description</Typography>
        <Rating name="read-only" value={3.5} readOnly precision={0.5} />
        <Stack direction="column" gap={4}>
          <Divider />
          <Typography variant="h4">price</Typography>
          <Divider />
        </Stack>
        <Stack direction="row" gap={6}>
          <Button
            variant="contained"
            size="large"
            color="secondary"
            sx={{
              "&.MuiButton-root": {
                borderRadius: "30px",
                width: "300px",
                height: "60px",
              },
            }}
          >
            Buy now
          </Button>
          <Button
            variant="outlined"
            size="large"
            color="secondary"
            sx={{
              "&.MuiButton-root": {
                borderRadius: "30px",
                width: "300px",
                height: "60px",
              },
            }}
          >
            Add to cart
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default NewProductPage;
