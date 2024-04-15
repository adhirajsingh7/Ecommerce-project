import React, { useState } from "react";
import { Box, Button, Stack, Typography } from "@mui/material";
import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";
import { useQuery } from "@tanstack/react-query";
import { fetchAddresses } from "../../api/address.api";
import SelectAddressCardComponent from "../../components/Cart Section/Checkout components/SelectAddressCard.component";

const OrdersPage = () => {
  const userId = JSON.parse(localStorage.getItem("userId") || "");

  const [selectedAddress, setSelectedAddress] = useState("");

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

  // console.log(addressList);
  console.log(selectedAddress);
  return (
    <Stack direction="column" sx={{ p: 2, width: 1, overflow: "auto" }} gap={2}>
      <Typography variant="h5">Orders</Typography>
      <Stack direction="row" gap={4}>
        {addressList?.data.map((address, index) => (
          <SelectAddressCardComponent
            key={index}
            address={address}
            selectedAddress={selectedAddress}
            setSelectedAddress={setSelectedAddress}
          />
        ))}
      </Stack>
    </Stack>
  );
};

export default OrdersPage;
