import React from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchUserById } from "../../api/user.api";
import { Stack } from "@mui/material";
import {
  AvatarUploadComponent,
  ChangePasswordComponent,
  PersonalDetailsComponent,
} from "@/components/Profile";
import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";

const ProfilePage = () => {
  const userId = JSON.parse(localStorage.getItem("userId") || "");

  const {
    isPending,
    isError,
    error,
    data: user,
  } = useQuery({
    queryKey: ["user"],
    queryFn: () => fetchUserById(userId),
  });

  if (isPending) {
    return (
      <Stack justifyContent="center" alignItems="center" sx={{ height: 1 }}>
        <ClimbingBoxLoader color="#FE6D87" size={25} />
      </Stack>
    );
  }

  return (
    <Stack direction="column" gap={2} sx={{ p: 2, overflow: "auto" }}>
      <AvatarUploadComponent {...user} />
      <PersonalDetailsComponent {...user} />
      <ChangePasswordComponent userId={user._id} />
    </Stack>
  );
};

export default ProfilePage;
