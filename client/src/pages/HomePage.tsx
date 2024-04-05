import {
  Box,
  IconButton,
  InputAdornment,
  Pagination,
  Stack,
  TablePagination,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import ProductFormComponent from "../components/Product form/ProductForm.component";
import ProductCardComponent from "../components/Product card/ProductCard.component";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { fetchProducts } from "../api/product.api";
import useDebounce from "../hooks/useDebounce";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";

const HomePage = () => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);

  // console.log(debouncedSearch);

  const {
    isPending,
    isError,
    error,
    data: productsList,
    isPlaceholderData,
  } = useQuery({
    queryKey: ["products", { page, rowsPerPage, debouncedSearch }],
    queryFn: () => fetchProducts({ page, rowsPerPage, debouncedSearch }),
    placeholderData: keepPreviousData,
    staleTime: 5000,
  });

  // console.log(productsList);
  if (isPending) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  function handleSearchChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setSearch(event.target.value);
    setPage(0);
  }

  const handleClearText = () => {
    setSearch("");
  };

  return (
    <Box sx={{ height: "calc(100vh - 64px)", width: 1 }}>
      <Stack direction="row" justifyContent="center" sx={{ p: 2, width: 1 }}>
        <ProductFormComponent setSearch={setSearch} setPage={setPage} />
      </Stack>
      <Stack direction="row" justifyContent="center" sx={{ p: 2 }}>
        <TextField
          sx={{ width: "300px" }}
          placeholder="Search by name"
          value={search}
          onChange={handleSearchChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                {search && (
                  <IconButton onClick={handleClearText} edge="end">
                    <ClearIcon />
                  </IconButton>
                )}
              </InputAdornment>
            ),
          }}
        />
      </Stack>
      <Stack
        direction="row"
        flexWrap="wrap"
        sx={{ mt: 4, p: 2, width: 1 }}
        gap={3}
      >
        {productsList?.data?.map((product: IProduct, index) => (
          <ProductCardComponent key={index} {...product} />
        ))}
      </Stack>
      <Stack direction="row" justifyContent="center">
        {productsList?.data?.length !== 0 ? (
          <TablePagination
            component="div"
            rowsPerPageOptions={[5, 10, 25, 50, 100]}
            count={productsList.total}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        ) : (
          <Typography sx={{ p: 2 }} variant="h4" textAlign="center">
            No Products found
          </Typography>
        )}
      </Stack>
    </Box>
  );
};

export default HomePage;
