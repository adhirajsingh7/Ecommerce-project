import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import LoaderComponent from "../components/Loader";
import { fetchProductById, updateProduct } from "../api/product.api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
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
import { addProductToCart } from "../api/cart.api";

const ProductPage = () => {
  const params = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const userCart = useOutletContext();
  // console.log(userCart)

  let productInCart = false;
  userCart[0]?.products.forEach((product) => {
    if (product.product._id === params.product_id) {
      productInCart = true;
    }
  });
  console.log(productInCart);

  const {
    isPending,
    isError,
    error,
    data: product,
  } = useQuery<IProduct>({
    queryKey: ["products"],
    queryFn: () => fetchProductById(params.product_id),
  });

  const {
    isPending: isAddProductPending,
    isError: isAddProductError,
    error: addProductError,
    mutate,
  } = useMutation({
    mutationFn: (updatedProduct) => addProductToCart(userId, updatedProduct),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      console.log(data);
    },
  });

  const userId = JSON.parse(localStorage.getItem("userId") || "");

  if (isPending) return <LoaderComponent />;

  if (isError) return <span>Error: {error.message}</span>;
  // console.log(product);

  const handleAddToCart = () => {
    // console.log(product);
    const updatedProduct = {
      product: product._id,
      quantity: 1,
      total_price: product.price,
    };
    mutate(updatedProduct);
  };

  const handleBuyNow = () => {
    const updatedProduct = {
      product: product._id,
      quantity: 1,
      total_price: product.price,
    };
    mutate(updatedProduct);
    navigate("/cart");
  };

  const handleViewCart = () => {
    navigate("/cart");
  };

  return (
    <>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="center"
        gap={8}
        sx={{ height: "calc(100vh- 64px)", width: 1, p: 2 }}
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
            {productInCart ? (
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
                onClick={handleViewCart}
              >
                View in Cart
              </Button>
            ) : (
              <>
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
                  onClick={handleBuyNow}
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
                  onClick={handleAddToCart}
                >
                  Add to cart
                </Button>
              </>
            )}
          </Stack>
        </Stack>
      </Stack>
      <ReviewsComponent />
    </>
  );
};

export default ProductPage;
