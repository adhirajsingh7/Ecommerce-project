import React from "react";
import { Box, Button, Stack, Typography } from "@mui/material";
import "./SellProductsCard.styles.scss";
import { useNavigate } from "react-router-dom";

const SellProductsCardComponent = (product: IProduct) => {
  const navigate = useNavigate();

  const handleView = (id: string) => {
    navigate(`/product/${id}`);
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
        src={product.image}
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
          {product.name}
        </Typography>
        <Typography
          variant="body1"
          sx={{
            height: "50px",
            textOverflow: "ellipsis",
            overflow: "hidden",
            whiteSpace: "nowrap",
          }}
        >
          {product.description}
        </Typography>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          gap={2}
        >
          <Typography variant="h4" fontWeight={600}>
            ${product.price}
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
