import React from "react";
import AvatarUploadComponent from "../../components/Profile section/Avatar upload/AvatarUpload.component";
import { useQuery } from "@tanstack/react-query";
import { fetchUserById } from "../../api/user.api";
import { Box, Stack } from "@mui/material";
import PersonalInformationComponent from "../../components/Profile section/Personal information/PersonalInformation.component";
import ChangePasswordComponent from "../../components/Profile section/Change password/ChangePassword.component";

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
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }
  // console.log(user);
  console.log(user)
  return (
    <Stack direction="column" gap={2} sx={{ p: 2, overflow: "auto" }}>
      {/* ProfilePage */}
      <AvatarUploadComponent {...user} />
      <PersonalInformationComponent {...user} />
      <ChangePasswordComponent userId={user._id}/>
    </Stack>
  );
};

export default ProfilePage;
