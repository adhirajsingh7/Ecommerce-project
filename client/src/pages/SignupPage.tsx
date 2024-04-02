import { Box, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import FormInputText from "../components/Form components/FormInputText";
import { FormInputRadio } from "../components/Form components/FormInputRadio";
import { role_options } from "../lib/constants";
import { TSignUpSchema, signUpSchema } from "../lib/type";
import { zodResolver } from "@hookform/resolvers/zod";
import LoadingButton from "@mui/lab/LoadingButton";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createUser } from "../api/user.api";

const SignupPage = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { isPending, isError, error, mutate } = useMutation({
    mutationFn: (user) => createUser(user),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });

  if (isError) {
    console.log(error.message);
  }

  const defaultValues = {
    username: "",
    email: "",
    password: "",
    full_name: "",
    mobile: "",
    role: "",
    avatar: "",
  };

  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors, isSubmitting },
  } = useForm<TSignUpSchema>({
    defaultValues,
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit: SubmitHandler<any> = async (data) => {
    console.log(data);
    mutate(data);
  };

  const [image, setImage] = useState<string | null>(null);
  const handleImageChange = (e) => {
    setImage(URL.createObjectURL(e.target.files[0]));
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
        <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
          <Stack direction="column" gap={2} sx={{ width: "400px" }}>
            <Typography variant="h4">Register User</Typography>
            <Box
              sx={{
                height: "100px",
                width: "100px",
                border: 1,
                borderStyle: `${image ? "hidden" : "dashed"}`,
                borderRadius: "50%",
              }}
            >
              {image ? (
                <img
                  src={image}
                  alt=""
                  style={{
                    height: "100%",
                    width: "100%",
                    borderRadius: "50%",
                  }}
                />
              ) : (
                <Stack
                  justifyContent="center"
                  alignItems="center"
                  sx={{
                    height: 1,
                    width: 1,
                  }}
                >
                  Image
                </Stack>
              )}
            </Box>
            <input
              type="file"
              {...register("avatar")}
              onChange={handleImageChange}
            />
            <FormInputText
              type="text"
              name={"username"}
              control={control}
              label={"Username"}
            />
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

            <FormInputText
              type="text"
              name={"full_name"}
              control={control}
              label={"Full name"}
            />
            <FormInputText
              type="text"
              name={"mobile"}
              control={control}
              label={"Mobile"}
            />
            <FormInputRadio
              name={"role"}
              control={control}
              label={"Role"}
              options={role_options}
              error={errors.role}
            />
            <LoadingButton
              type="submit"
              loading={isPending}
              loadingPosition="center"
              variant="contained"
            >
              <span>Signup</span>
            </LoadingButton>
            <Link to="/login">Already have an account? Log in here</Link>
          </Stack>
        </form>
      </Box>
    </Box>
  );
};

export default SignupPage;
