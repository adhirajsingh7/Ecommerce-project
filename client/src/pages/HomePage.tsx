import { Box, Pagination, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import ProductFormComponent from "../components/Product form/ProductForm.component";
import ProductCardComponent from "../components/Product card/ProductCard.component";
import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "../api/product.api";

const HomePage = () => {
  const [page, setPage] = useState(1);
  const {
    isPending,
    isError,
    error,
    data: usersList,
  } = useQuery({
    queryKey: ["products", { page }],
    queryFn: () => fetchProducts({ page }),
  });
  console.log(usersList);

  if (isPending) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  return (
    <Box sx={{ height: "100vh", width: 1 }}>
      <Stack direction="row" justifyContent="center" sx={{ p: 2, width: 1 }}>
        <ProductFormComponent />
      </Stack>

      <Stack
        direction="row"
        flexWrap="wrap"
        sx={{ mt: 4, p: 2, width: 1 }}
        gap={3}
      >
        {usersList?.data?.map((product: IProduct, index) => (
          <ProductCardComponent key={index} {...product} />
        ))}
      </Stack>
      <Stack direction="row" justifyContent="center">
        <Pagination
          page={page}
          onChange={(e) => setPage(e.target.value)}
          count={usersList.total}
        />
      </Stack>
    </Box>
  );
};

export default HomePage;
