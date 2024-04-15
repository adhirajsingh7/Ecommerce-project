import React, { useState } from "react";
import { Box, Button, Stack, Typography } from "@mui/material";
import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchAddresses } from "../../../api/address.api";
import SelectAddressCardComponent from "./SelectAddressCard.component";
import { createOrder } from "../../../api/order.api";

const SelectAddressComponent = (props: any) => {
  const { closeModal, amount, cartId } = props;
  const userId = JSON.parse(localStorage.getItem("userId") || "");

  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: (order) => createOrder(order),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
  });

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

  if (isPending) return <div>Loading...</div>;

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  // console.log(addressList);
  // console.log(selectedAddress);

  const handlePlaceOrder = () => {
    const order = {
      user_id: userId,
      cart_id: cartId,
      address_id: selectedAddress,
      total_amount: amount,
    };
    console.log(order);
    mutate(order);
  };

  return (
    <Stack direction="column" sx={{ p: 2, width: 1, overflow: "auto" }} gap={2}>
      <Typography variant="h5">Select your address</Typography>
      <Stack direction="row" gap={4} flexWrap="wrap">
        {addressList?.data.map((address, index) => (
          <SelectAddressCardComponent
            key={index}
            address={address}
            selectedAddress={selectedAddress}
            setSelectedAddress={setSelectedAddress}
          />
        ))}
      </Stack>
      <Stack direction="row" justifyContent="flex-end">
        <Button onClick={() => closeModal()}>Back</Button>
        <Button onClick={handlePlaceOrder}>Place order</Button>
      </Stack>
    </Stack>
  );
};

export default SelectAddressComponent;
