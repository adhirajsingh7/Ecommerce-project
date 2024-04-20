import React from "react";
import { Stack, Typography } from "@mui/material";
import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";
import {
  AddressCardComponent,
  CreateAddress,
} from "@/components/Address";
import { useGetAddresses } from "@/features/address/api/getAddresses";

const AddressPage = () => {
  const userId = JSON.parse(localStorage.getItem("userId") || "");

  const { isPending, data: addressList } = useGetAddresses(userId);

  if (isPending) {
    return (
      <Stack justifyContent="center" alignItems="center" sx={{ height: 1 }}>
        <ClimbingBoxLoader color="#FE6D87" size={25} />
      </Stack>
    );
  }

  return (
    <Stack direction="column" sx={{ p: 2, width: 1, overflow: "auto" }} gap={2}>
      <Typography variant="h5">AddressPage</Typography>
      <Stack direction="row" justifyContent="flex-end" sx={{ width: 1 }}>
        <CreateAddress />
      </Stack>
      <Stack direction="row" gap={4}>
        {Array.isArray(addressList?.data) &&
          addressList.data.map((address: any) => (
            <AddressCardComponent key={address._id} address={address} />
          ))}
      </Stack>
    </Stack>
  );
};

export default AddressPage;
