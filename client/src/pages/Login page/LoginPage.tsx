import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Divider,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { LoadingButton } from "@mui/lab";
import FormInputText from "../../components/Form components/FormInputText";
import { TLoginSchema, loginSchema } from "../../lib/type";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { loginUser } from "../../api/user.api";

const LoginPage = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { isPending, isError, error, mutate } = useMutation({
    mutationFn: (user) => loginUser(user),
    onSuccess: (data) => {
      localStorage.setItem("userId", JSON.stringify(data.user._id));
      navigate("/");
    },
  });

  if (isError) {
    console.log(error.message);
  }

  const defaultValues = {
    email: "",
    password: "",
  };

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<TLoginSchema>({
    defaultValues,
    resolver: zodResolver(loginSchema),
  });

  const onSubmit: SubmitHandler<any> = async (data) => {
    // console.log(data);
    mutate(data);
  };

  return (
    <Box
      sx={{
        height: "100vh",
        width: 1,
      }}
    >
      <Box
        sx={{
          height: 1,
          width: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Stack
          direction="column"
          gap={2}
          sx={{
            p: 8,
            boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
            borderRadius: 6,
          }}
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack direction="column" gap={2} sx={{ width: "350px" }}>
              <Typography variant="h4">Login User</Typography>
              <FormInputText
                type="text"
                name={"email"}
                control={control}
                label={"Email"}
              />
              <FormInputText
                type="text"
                name={"password"}
                control={control}
                label={"Password"}
              />
              <LoadingButton
                type="submit"
                loading={isPending}
                loadingPosition="center"
                variant="contained"
              >
                <span>Login</span>
              </LoadingButton>
            </Stack>
          </form>
          <Typography variant="body1" textAlign="center">
            Don't have any account?
            <Link to="/signup">
              <span>Signup</span>
            </Link>
          </Typography>
        </Stack>
      </Box>
    </Box>
  );
};

export default LoginPage;
