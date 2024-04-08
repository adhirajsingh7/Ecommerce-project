import {
  Box,
  Button,
  IconButton,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { EmptyCart, fetchCart, updateCart } from "../../api/cart.api";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import CartCheckoutComponent from "../../components/Cart Section/CartCheckout.component";

const CartPage = () => {
  const userId = JSON.parse(localStorage.getItem("userId") || "");
  const queryClient = useQueryClient();

  const {
    isPending,
    isError,
    error,
    data: userCart,
  } = useQuery({
    queryKey: ["cart"],
    queryFn: () => fetchCart({ userId }),
  });

  const {
    isPending: isUpdateProductPending,
    isError: isUpdateProductError,
    error: UpdateProductError,
    mutate,
  } = useMutation({
    mutationFn: (updatedProduct) => updateCart(userCart[0]._id, updatedProduct),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      console.log(data);
    },
  });

  const {
    isPending: isEmptyCartPending,
    isError: isEmptyCartError,
    error: emptyCartError,
    mutate: emptyCartMutation,
  } = useMutation({
    mutationFn: () => EmptyCart(userCart[0]._id),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      console.log(data);
    },
  });

  // console.log(userCart);

  if (isPending) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  const handleIncreaseQuantity = (product) => {
    const upatedProduct = {
      product: product.product._id,
      quantity: product.quantity + 1,
      total_price: product.product.price * (product.quantity + 1),
    };
    mutate(upatedProduct);
  };

  const handleDecreaseQuantity = (product) => {
    const upatedProduct = {
      product: product.product._id,
      quantity: product.quantity - 1,
      total_price: product.product.price * (product.quantity - 1),
    };
    mutate(upatedProduct);
  };

  const handleEmptyCart = () => {
    emptyCartMutation();
  };
  // console.log(userCart)

  return (
    <Box sx={{ height: "calc(100vh - 64px)", width: 1 }}>
      <Typography variant="h4" textAlign="center" sx={{ p: 2 }}>
        CartPage
      </Typography>
      <Stack direction="row" justifyContent="flex-end" sx={{ mr: 4 }}>
        <Button variant="contained" onClick={handleEmptyCart}>
          Empty cart
        </Button>
      </Stack>
      <Stack direction="row" justifyContent="space-around" sx={{ mt: 4 }}>
        <Stack direction="column" gap={3}>
          {userCart[0].products.map((product, index) => (
            <Stack
              key={index}
              direction="row"
              gap={2}
              component={Paper}
              elevation={2}
              sx={{ p: 2 }}
            >
              <Stack direction="column" gap={2}>
                <Typography variant="body1">
                  name - {product.product.name}
                </Typography>
                <Typography variant="body1">
                  {" "}
                  description -{product.product.description}
                </Typography>
                <Typography variant="body1">
                  category - {product.product.category}
                </Typography>
              </Stack>
              <Typography variant="body1">
                Quantity - {product.quantity}
              </Typography>
              <Typography variant="body1">
                Price - {product.quantity * product.product.price}
              </Typography>
              <Stack direction="row" height={"fit-content"}>
                <IconButton onClick={() => handleIncreaseQuantity(product)}>
                  <AddIcon />
                </IconButton>
                <IconButton onClick={() => handleDecreaseQuantity(product)}>
                  <RemoveIcon />
                </IconButton>
              </Stack>
            </Stack>
          ))}
        </Stack>
        <CartCheckoutComponent {...userCart[0]} />
      </Stack>
    </Box>
  );
};

export default CartPage;
