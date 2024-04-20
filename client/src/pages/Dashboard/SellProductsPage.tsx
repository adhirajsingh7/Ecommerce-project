import {
  Chip,
  CircularProgress,
  IconButton,
  InputAdornment,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CreateProduct, UpdateProduct } from "@/components/Products";
import { useGetProducts } from "@/features/products/api/getProducts";
import { productTableColumns } from "@/lib/constants";
import { useDeleteProduct } from "@/features/products/api/deleteProduct";
import useDebounce from "@/hooks/useDebounce";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";

const SellProductsPage = () => {
  const [deletingProductId, setDeletingProductId] = useState<string | null>(
    null
  );
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [search, setSearch] = useState("");

  const debouncedSearch = useDebounce(search, 500);
  const navigate = useNavigate();

  const { isPending, data: productsList } = useGetProducts(
    page,
    rowsPerPage,
    debouncedSearch
  );

  const { isPending: isDeletePending, mutate: deleteProductMutation } =
    useDeleteProduct();

  console.log(productsList);
  if (isPending) {
    return (
      <Stack
        justifyContent="center"
        alignItems="center"
        sx={{ height: "calc(100vh - 64px)" }}
      >
        <ClimbingBoxLoader color="#FE6D87" size={25} />
      </Stack>
    );
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

  const handleView = (id: string) => {
    navigate(`/product/${id}`);
  };

  const handleDelete = (productId: string) => {
    setDeletingProductId(productId);
    deleteProductMutation(productId);
  };

  return (
    // bgcolor: "#F7F8FA"
    <>
      <Stack
        direction="column"
        sx={{ p: 2, width: 1, overflow: "auto" }}
        gap={2}
      >
        <Typography variant="h5">Sell products</Typography>
        <Stack direction="row" justifyContent="space-between" sx={{ p: 1 }}>
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
          <CreateProduct setSearch={setSearch} setPage={setPage} />
        </Stack>
        <TableContainer component={Paper}>
          <Table
            sx={{ minWidth: 650 }}
            stickyHeader={true}
            aria-label="products table"
          >
            <TableHead>
              <TableRow>
                {productTableColumns.map((column) => (
                  <TableCell key={column} align="left">
                    {column}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {productsList.data.length > 0 ? (
                productsList.data.map((row) => (
                  <TableRow
                    key={row._id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row" align="left">
                      <img
                        src={row.image}
                        alt=""
                        style={{
                          height: "50px",
                          width: "50px",
                          borderRadius: "10px",
                          objectFit: "cover",
                        }}
                      />
                    </TableCell>
                    <TableCell align="left">{row.name}</TableCell>
                    <TableCell align="left">
                      <Chip color="info" label={row.category} />
                    </TableCell>
                    <TableCell align="left">{row.price}</TableCell>
                    <TableCell align="left">{row.stock}</TableCell>
                    <TableCell align="left">
                      {deletingProductId === row._id && isDeletePending ? (
                        <CircularProgress color="inherit" size={24} />
                      ) : (
                        <>
                          <IconButton onClick={() => handleView(row._id)}>
                            <VisibilityIcon />
                          </IconButton>
                          <UpdateProduct product={row} />
                          <IconButton onClick={() => handleDelete(row._id)}>
                            <DeleteIcon />
                          </IconButton>
                        </>
                      )}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableCell align="center" colSpan={6}>
                  No data found
                </TableCell>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <Stack direction="row" justifyContent="flex-end">
          {productsList?.data?.length !== 0 && (
            <TablePagination
              component="div"
              rowsPerPageOptions={[5, 10, 25, 50, 100]}
              count={productsList.total}
              page={page}
              onPageChange={handleChangePage}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          )}
        </Stack>
      </Stack>
    </>
  );
};

export default SellProductsPage;
