import React, { useState } from "react";
import { Button, CircularProgress, Stack, Typography } from "@mui/material";
import { SelectAddressCardComponent } from "./SelectAddressCard.component";
import { useGetAddresses } from "@/features/address/api/getAddresses";
import { useCreateOrder } from "@/features/orders/api/createOrder";

export const SelectAddressComponent = (props: any) => {
  const { closeModal, amount, cartId } = props;
  const [selectedAddress, setSelectedAddress] = useState("");
  const userId = JSON.parse(localStorage.getItem("userId") || "");

  const { isPending, data: addressList } = useGetAddresses(userId);
  const { mutate: createOrderMutation } = useCreateOrder();

  if (isPending) {
    return (
      <Stack justifyContent="center" alignItems="center" sx={{ height: 1 }}>
        <CircularProgress />
      </Stack>
    );
  }

  const handlePlaceOrder = () => {
    const order = {
      user_id: userId,
      cart_id: cartId,
      address_id: selectedAddress,
      total_amount: amount,
    };
    console.log(order);
    createOrderMutation(order);
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
        <Button color="inherit" onClick={() => closeModal()}>
          Back
        </Button>
        <Button onClick={handlePlaceOrder}>Place order</Button>
      </Stack>
    </Stack>
  );
};