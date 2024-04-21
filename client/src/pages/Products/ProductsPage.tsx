import {
  Divider,
  IconButton,
  InputAdornment,
  Stack,
  TablePagination,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";
import { useGetProducts } from "@/features/products/api/getProducts";
import {
  ProductCard,
  ProductsFilterComponent,
  ProductsSortComponent,
} from "@/components/Products";
import useDebounce from "@/hooks/useDebounce";

const ProductsPage = () => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);
  const [categories, setCategories] = useState<string[]>([]);
  const [sortProducts, setSortProducts] = React.useState("relevance");

  const { isPending, data: productsList } = useGetProducts(
    page,
    rowsPerPage,
    debouncedSearch,
    categories,
    sortProducts
  );

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
    <>
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
      <Divider orientation="horizontal" />
      <Stack
        direction="row"
        // height: "calc(100vh - 64px - 40px)",
        sx={{ width: 1, height: "100vh" }}
      >
        {/* border: 1, */}
        <Stack direction="column" sx={{ height: "100%", width: 1 / 5, p: 2 }}>
          <ProductsFilterComponent
            setCategories={setCategories}
            setPage={setPage}
          />
        </Stack>
        <Divider orientation="vertical" />
        <Stack
          direction="column"
          // border: 1,
          sx={{
            width: 4 / 5,
            bgcolor: "#f5f5f5",
            px: 2,
            py: 1,
          }}
          // bgcolor: "#e3e5e8"
        >
          <Stack
            direction="row"
            justifyContent="flex-end"
            gap={2}
            // sx={{ px: 2 }}
          >
            <ProductsSortComponent
              sortProducts={sortProducts}
              setSortProducts={setSortProducts}
              setPage={setPage}
            />
          </Stack>
          {!isPending ? (
            <>
              <Stack direction="row" flexWrap="wrap" gap={3}>
                {productsList?.data.data?.map((product: IProduct, index) => (
                  <ProductCard key={index} {...product} />
                ))}
              </Stack>
              <Stack direction="row" justifyContent="center">
                {productsList?.data?.data?.length !== 0 ? (
                  <TablePagination
                    component="div"
                    rowsPerPageOptions={[5, 10, 25, 50, 100]}
                    count={productsList?.data?.total}
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
            </>
          ) : (
            <Stack
              sx={{ height: 1 }}
              direction="row"
              justifyContent="center"
              alignItems="center"
            >
              <ClimbingBoxLoader color="#FE6D87" size={25} />
            </Stack>
          )}
        </Stack>
      </Stack>
    </>
  );
};

export default ProductsPage;
