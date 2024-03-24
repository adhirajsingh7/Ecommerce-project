import { Box, IconButton, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ProductPage = () => {
  const [product, setProduct] = useState<IProduct>();
  const params = useParams();
  useEffect(() => {
    const getProduct = async () => {
      try {
        const { data } = await axios.get(`/products/${params.product_id}`);
        setProduct(data);
      } catch (error) {
        console.log(error);
      }
    };
    getProduct();
  }, []);
  return (
    <Box>
      <Typography variant="h4">ProductPage</Typography>
      <Typography variant="body1">Name - {product?.name}</Typography>
      <Typography variant="body1">
        Description - {product?.description}
      </Typography>
      <Typography variant="body1">Price - {product?.price}</Typography>
    </Box>
  );
};

export default ProductPage;
