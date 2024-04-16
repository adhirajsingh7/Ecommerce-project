import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Chip,
  Stack,
  TablePagination,
  Typography,
} from "@mui/material";
import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";
import { useQuery } from "@tanstack/react-query";
import { fetchOrders } from "../../api/order.api";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const OrdersPage = () => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const userId = JSON.parse(localStorage.getItem("userId") || "");
  // console.log(userId);
  const {
    isPending,
    isError,
    error,
    data: ordersList,
  } = useQuery({
    queryKey: ["orders", { page, rowsPerPage, userId }],
    queryFn: () => fetchOrders({ page, rowsPerPage, userId }),
  });
  console.log(ordersList);

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

  return (
    <>
      <Stack
        direction="column"
        sx={{ p: 2, width: 1, overflow: "auto" }}
        gap={2}
      >
        <Typography variant="h5">Orders</Typography>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left">Order id</TableCell>
                <TableCell align="left">Status</TableCell>
                <TableCell align="left">Total amount</TableCell>
                <TableCell align="left">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {ordersList.data.map((row) => (
                <TableRow
                  key={row._id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row" align="left">
                    {row._id}
                  </TableCell>
                  <TableCell align="left">
                    <Chip color="warning" label={row.status} />
                  </TableCell>
                  <TableCell align="left">${row.total_amount}</TableCell>
                  <TableCell align="left">
                    <Button>Cancel Order</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Stack direction="row" justifyContent="flex-end">
          {ordersList?.data?.length !== 0 && (
            <TablePagination
              component="div"
              rowsPerPageOptions={[5, 10, 25, 50, 100]}
              count={ordersList.total}
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

export default OrdersPage;
