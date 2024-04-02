import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LoaderComponent from "../components/Loader";
import { fetchProductById } from "../api/product.api";
import { useQuery } from "@tanstack/react-query";
import {
  Box,
  Button,
  Chip,
  Divider,
  Rating,
  Stack,
  Typography,
} from "@mui/material";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import ReviewsComponent from "../components/Reviews section/Reviews.component";

const ProductPage = () => {
  const params = useParams();

  const {
    isPending,
    isError,
    error,
    data: product,
  } = useQuery<IProduct>({
    queryKey: ["products"],
    queryFn: () => fetchProductById(params.product_id),
  });

  if (isPending) return <LoaderComponent />;

  if (isError) return <span>Error: {error.message}</span>;
  // console.log(product);
  return (
    <>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="center"
        gap={8}
        sx={{ height: "80vh", width: 1 }}
      >
        <img
          src={product.image}
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
          <Typography variant="h2">{product.name}</Typography>
          <Typography variant="body1">{product.description}</Typography>
          <Rating name="read-only" value={3.5} readOnly precision={0.5} />
          <Stack direction="column" gap={4}>
            <Divider />
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-around"
            >
              <Typography variant="h4">$ {product.price}</Typography>
              <Stack direction="row" gap={2}>
                <Chip
                  label="Category"
                  variant="filled"
                  size="medium"
                  color="primary"
                />
                <Chip
                  label={product.category}
                  variant="outlined"
                  size="medium"
                  color="primary"
                />
              </Stack>
              <Stack direction="row" gap={2}>
                <Chip
                  label="Stock"
                  variant="filled"
                  size="medium"
                  color="success"
                />
                <Chip
                  label={product.stock}
                  variant="outlined"
                  size="medium"
                  color="success"
                />
              </Stack>
            </Stack>
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
              startIcon={<ShoppingCartOutlinedIcon />}
            >
              Add to cart
            </Button>
          </Stack>
        </Stack>
      </Stack>
      <ReviewsComponent />
    </>
  );
};

export default ProductPage;
