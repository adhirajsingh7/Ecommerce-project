import { Box, Divider, Stack, Typography } from "@mui/material";
import React from "react";
import DashboardSidebar from "./DashboardSidebar";
import { Outlet } from "react-router-dom";

const DashboardPage = () => {
  return (
    <Stack
      justifyContent="center"
      alignItems="center"
      sx={{
        height: "calc(100vh - 64px)",
        width: 1,
        p: 4,
        bgcolor: "#f7f8fa",
        boxSizing: "border-box",
      }}
    >
      <Stack
        direction="row"
        justifyContent="space-between"
        sx={{ height: 1, width: 1, bgcolor: "white", p: 2 }}
      >
        <DashboardSidebar />
        <Stack
          // justifyContent="center"
          // alignItems="center"
          sx={{ width: 4 / 5 }}
        >
          {/* <Typography variant="h5">Content</Typography> */}
          <Outlet />
        </Stack>
      </Stack>
    </Stack>
  );
};

export default DashboardPage;
