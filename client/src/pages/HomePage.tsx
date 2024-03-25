import {
  Box,
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

const HomePage = () => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);

  console.log(debouncedSearch);

  const {
    isPending,
    isError,
    error,
    data: usersList,
    isPlaceholderData,
  } = useQuery({
    queryKey: ["products", { page, rowsPerPage, debouncedSearch }],
    queryFn: () => fetchProducts({ page, rowsPerPage, debouncedSearch }),
    placeholderData: keepPreviousData,
    staleTime: 5000,
  });

  // console.log(usersList);
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
  }

  return (
    <Box sx={{ height: "100vh", width: 1 }}>
      <Stack direction="row" justifyContent="center" sx={{ p: 2, width: 1 }}>
        <ProductFormComponent />
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
          }}
        />
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
        <TablePagination
          component="div"
          rowsPerPageOptions={[5, 10, 25, 50, 100]}
          count={usersList.total}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Stack>
    </Box>
  );
};

export default HomePage;
