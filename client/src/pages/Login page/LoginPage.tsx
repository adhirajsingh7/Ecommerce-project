import { Stack, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const LoginPage = () => {
  return (
    <Stack direction="column" gap={2}>
      <Typography variant="h6">LoginPage</Typography>
      <Link to="/signup">Dont have an account, Signup here</Link>
    </Stack>
  );
};

export default LoginPage;
