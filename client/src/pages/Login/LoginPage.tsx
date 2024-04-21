import React, { useEffect, useState } from "react";
import { Box, Paper, Stack, Typography } from "@mui/material";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { LoadingButton } from "@mui/lab";
import { FormInputText } from "../../components/Form/FormInputText";
import { TLoginSchema, loginSchema } from "../../lib/type";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { useLoginUser } from "@/features/auth/api/login";
import googleIcon from "@/assets/icons/google_icon.svg";

const LoginPage = () => {
  const navigate = useNavigate();
  const { isPending, mutate } = useLoginUser();

  useEffect(() => {
    const getUser = async () => {
      try {
        await axios.get("/login/success");
        navigate("/");
      } catch (error) {
        // console.log(error);
      }
    };
    getUser();
  }, []);

  const googleAuth = () => {
    window.open("http://localhost:8080/login/federated/google", "_self");
  };

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
  if (isPending) return <div>Loading...</div>;

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
                size="medium"
              />
              <FormInputText
                type="text"
                name={"password"}
                control={control}
                label={"Password"}
                size="medium"
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
          <Stack direction="row" justifyContent="center">
            <Stack
              direction="row"
              justifyContent="center"
              alignItems="center"
              gap={2}
              sx={{
                borderRadius: 50,
                width: 1,
                color: "white",
                bgcolor: "#111111",
                p: 1,
                "&:hover": { cursor: "pointer", bgcolor: "#393C3F" },
              }}
              component={Paper}
              elevation={1}
              onClick={googleAuth}
            >
              <img src={googleIcon} alt="" width="50px" height="50px" />
              <Typography variant="h6">Login with google</Typography>
            </Stack>
          </Stack>
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
