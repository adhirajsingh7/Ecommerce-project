import React from "react";
import {
  Box,
  CircularProgress,
  IconButton,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteProduct } from "../../api/product.api";
import UpdateProductComponent from "../Update product/UpdateProduct.component";

const ProductCardComponent = (product: IProduct) => {
  const queryClient = useQueryClient();
  const { isPending, isError, error, mutate } = useMutation({
    mutationFn: (productId: string) => deleteProduct(productId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
  const navigate = useNavigate();

  const handleView = (id: string) => {
    navigate(`/product/${id}`);
  };

  const handleDelete = (productId: string) => {
    mutate(productId);
  };

  return (
    <Stack
      direction="column"
      sx={{ p: 2, minWidth: "250px" }}
      component={Paper}
      elevation={1}
      gap={1}
    >
      <Typography variant="h6">Name - {product.name}</Typography>
      <Typography variant="body1">
        Description - {product.description}
      </Typography>
      <Typography variant="body1">Price - {product.price}</Typography>
      <Stack direction="row" justifyContent="flex-end">
        {isPending ? (
          <CircularProgress color="inherit" size={24} />
        ) : (
          <>
            <IconButton onClick={() => handleView(product?._id)}>
              <VisibilityIcon />
            </IconButton>
            <UpdateProductComponent {...product} />
            <IconButton onClick={() => handleDelete(product?._id)}>
              <DeleteIcon />
            </IconButton>
          </>
        )}
      </Stack>
    </Stack>
  );
};

export default ProductCardComponent;
