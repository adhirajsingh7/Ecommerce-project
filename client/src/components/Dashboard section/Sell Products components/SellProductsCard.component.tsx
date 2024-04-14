import { Box, Button, Stack, Typography } from "@mui/material";
import React from "react";
import demoImage from "../../../assets/images/icecream-image.jpg";
import "./SellProductsCard.styles.scss";
import { useNavigate } from "react-router-dom";

const SellProductsCardComponent = (product: IProduct) => {
  const navigate = useNavigate();

  const handleView = (id: string) => {
    if (id) {
      navigate(`/product/${id}`);
    }
  };
  return (
    <Stack
      className="card-container"
      direction="column"
      sx={{
        height: "350px",
        width: "300px",
        borderRadius: "25px",
        bgcolor: "white",
      }}
    >
      <img
        className="card-image"
        src={product.image || demoImage}
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
          {product.name || "Vanila ice cream"}
        </Typography>
        <Typography variant="body1" sx={{ textOverflow: "hidden" }}>
          {product.description ||
            "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Inventore"}
        </Typography>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          gap={2}
        >
          <Typography variant="h4" fontWeight={600}>
            ${product.price || "10"}
          </Typography>
          <Button
            variant="contained"
            color="warning"
            onClick={() => handleView(product?._id)}
          >
            View item
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default SellProductsCardComponent;
