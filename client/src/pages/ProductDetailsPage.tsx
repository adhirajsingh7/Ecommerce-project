import React from "react";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import { Button, Chip, Divider, Stack, Typography } from "@mui/material";
import { useGetProductById } from "@/features/products/api/getProductById";
import { ReviewsComponent } from "@/components/Reviews";
import { useAddToCart } from "@/features/cart/api/addToCart";
import { Loading } from "@/components/Loading";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";

const ProductDetailsPage = () => {
  const navigate = useNavigate();
  const params = useParams();
  const userCart = useOutletContext();

  let productInCart = false;
  userCart?.products.forEach((product) => {
    if (product.product._id === params.product_id) {
      productInCart = true;
    }
  });

  const { isPending, data: product } = useGetProductById(params.product_id);
  const { mutate } = useAddToCart();

  if (isPending) return <Loading />;

  const handleAddToCart = () => {
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
          src={product?.image}
          alt=""
          style={{
            height: "600px",
            width: "600px",
            objectFit: "contain",
            borderRadius: "10%",
            backgroundColor: "#f5f6f6",
          }}
        />
        <Stack direction="column" gap={2} sx={{ p: 2, width: 1 / 2 }}>
          <Typography variant="h2">{product?.name}</Typography>
          <Typography variant="body1">{product?.description}</Typography>
          <Stack direction="column" gap={4}>
            <Divider />
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-around"
            >
              <Typography variant="h4">$ {product?.price}</Typography>
              <Stack direction="row" gap={2}>
                <Chip
                  label="Category"
                  variant="filled"
                  size="medium"
                  color="primary"
                />
                <Chip
                  label={product?.category}
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
                  label={product?.stock}
                  variant="outlined"
                  size="medium"
                  color="success"
                />
              </Stack>
            </Stack>
            <Divider />
          </Stack>
          {product?.stock > 0 ? (
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
          ) : (
            <Typography variant="h3" textAlign="center" color="error">
              Out of stock
            </Typography>
          )}
        </Stack>
      </Stack>
      <ReviewsComponent />
    </>
  );
};

export default ProductDetailsPage;
