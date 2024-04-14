import { Box, Button, Stack, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import React from "react";
import AddressCardComponent from "../../components/Dashboard section/Address components/AddressCard.component";
import AddressModalComponent from "../../components/Dashboard section/Address components/AddressModal.component";
import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";
import { useQuery } from "@tanstack/react-query";
import { fetchAddresses } from "../../api/address.api";

const AddressPage = () => {
  const userId = JSON.parse(localStorage.getItem("userId") || "");

  const {
    isPending,
    isError,
    error,
    data: addressList,
  } = useQuery({
    queryKey: ["address"],
    queryFn: () => fetchAddresses({ userId }),
  });

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

  console.log(addressList);

  return (
    <Stack direction="column" sx={{ p: 2, width: 1 }} gap={2}>
      <Typography variant="h5">AddressPage</Typography>
      <Stack direction="row" justifyContent="flex-end" sx={{ width: 1 }}>
        <AddressModalComponent />
      </Stack>
      <Stack direction="column" gap={2}>
        {addressList?.data.map((address, index) => (
          <AddressCardComponent key={index} {...address} />
        ))}
      </Stack>
      <Stack direction="row" gap={2}></Stack>
    </Stack>
  );
};

export default AddressPage;
