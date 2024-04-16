import React from "react";
import { Box, Button, Stack, Typography } from "@mui/material";
import AddressCardComponent from "../../components/Dashboard section/Address components/AddressCard.component";
import AddressModalComponent from "../../components/Dashboard section/Address components/AddressModal.component";
import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchAddresses, deleteAddress } from "../../api/address.api";
import { toast } from "react-toastify";

const AddressPage = () => {
  const userId = JSON.parse(localStorage.getItem("userId") || "");
  const queryClient = useQueryClient();

  const {
    isPending,
    isError,
    error,
    data: addressList,
  } = useQuery({
    queryKey: ["address"],
    queryFn: () => fetchAddresses({ userId }),
  });

  const { mutate: deleteAddressMutation } = useMutation({
    mutationFn: (addressId: string) => deleteAddress(addressId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["address"] });
      toast.success("Address deleted succesfully");
    },
  });

  const handleDelete = (addressId: string) => {
    deleteAddressMutation(addressId);
  };

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
    <Stack direction="column" sx={{ p: 2, width: 1, overflow: "auto" }} gap={2}>
      <Typography variant="h5">AddressPage</Typography>
      <Stack direction="row" justifyContent="flex-end" sx={{ width: 1 }}>
        <AddressModalComponent />
      </Stack>
      <Stack direction="row" gap={4}>
        {addressList?.data.map((address, index) => (
          <AddressCardComponent
            key={index}
            address={address}
            handleDelete={handleDelete}
          />
        ))}
      </Stack>
    </Stack>
  );
};

export default AddressPage;
