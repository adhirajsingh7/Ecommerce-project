import { Box, Button, FormHelperText, Stack, Typography } from "@mui/material";
import React, { useEffect } from "react";
import FormInputText from "../../Form components/FormInputText";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TAddressSchema, addressSchema } from "../../../lib/type";
import { LoadingButton } from "@mui/lab";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { address_type_options } from "../../../lib/constants";
import { createAddress, updateAddress } from "../../../api/address.api";
import { FormInputRadio } from "../../Form components/FormInputRadio";

interface propTypes {
  address?: IAddress;
  closeModal: () => void;
}

const AddressFormComponent = (props: propTypes) => {
  const userId = JSON.parse(localStorage.getItem("userId") || "");
  const { address, closeModal } = props;
  const queryClient = useQueryClient();
  console.log(address);

  const {
    isPending,
    isError,
    error,
    mutate: createAddressMutation,
  } = useMutation({
    mutationFn: (address) => createAddress(userId, address),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["address"] });
    },
  });

  const {
    isPending: isUpdatePending,
    isError: isUpdateError,
    error: updateError,
    mutate: updateAddressMutation,
  } = useMutation({
    mutationFn: (updatedAddress) => updateAddress(address?._id, updatedAddress),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["address"] });
    },
  });

  let defaultValues = {
    name: "",
    phone: "",
    pincode: "",
    city: "",
    state: "",
    country: "",
    locality: "",
    flat_no: "",
    landmark: "",
    address_type: "home",
  };

  const {
    register,
    handleSubmit,
    watch,
    control,
    reset,
    formState: { errors },
  } = useForm<TAddressSchema>({
    defaultValues,
    resolver: zodResolver(addressSchema),
  });

  useEffect(() => {
    if (address) {
      // reset({
      //   name: address.name,
      //   phone: address.phone,
      //   pincode: address.pincode,
      //   city: address.city,
      //   state: address.state,
      //   country: address.country,
      //   locality: address.locality,
      //   flat_no: address.flat_no,
      //   landmark: address.landmark,
      //   address_type: address.address_type,
      // });
      reset(address);
    }
  }, [address, reset]);

  const onSubmit: SubmitHandler<any> = async (data) => {
    console.log(data);
    if (address) {
      updateAddressMutation(data);
    } else {
      createAddressMutation(data);
    }
    reset();
    closeModal();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack direction="column" gap={2} sx={{ minWidth: "600px" }}>
        <Typography variant="h4">{address ? "Edit" : "Add"} address</Typography>
        <Stack direction="column" gap={2}>
          <Typography variant="h6">Contact Info</Typography>
          <Stack direction="row" gap={2}>
            <FormInputText
              type="text"
              name={"name"}
              control={control}
              label={"Name"}
            />
            <FormInputText
              type="number"
              name={"phone"}
              control={control}
              label={"Phone"}
            />
          </Stack>
        </Stack>
        <Stack direction="column" gap={2}>
          <Typography variant="h6">Address Info</Typography>
          <Box sx={{ width: "200px" }}>
            <FormInputText
              type="number"
              name={"pincode"}
              control={control}
              label={"Pincode"}
            />
          </Box>
          <Stack direction="row" gap={2}>
            <FormInputText
              type="text"
              name={"city"}
              control={control}
              label={"City"}
            />
            <FormInputText
              type="text"
              name={"state"}
              control={control}
              label={"State"}
            />
            <FormInputText
              type="text"
              name={"country"}
              control={control}
              label={"Country"}
            />
          </Stack>
          <Stack direction="column" gap={3} mt={2}>
            <FormInputText
              type="text"
              name={"locality"}
              control={control}
              label={"Locality/Area/Street"}
            />
            <FormInputText
              type="text"
              name={"flat_no"}
              control={control}
              label={"Flat no/Building Name"}
            />
          </Stack>
        </Stack>
        <Box>
          <FormInputText
            type="text"
            name={"landmark"}
            control={control}
            label={"Landmark"}
          />
          <FormHelperText sx={{ ml: 1 }}>optional</FormHelperText>
        </Box>
        <Stack direction="column" gap={2}>
          <FormInputRadio
            name={"address_type"}
            control={control}
            label={"Type of Address"}
            options={address_type_options}
            error={errors.address_type}
          />
        </Stack>
        <Stack direction="row" justifyContent="flex-end" gap={2}>
          <Button variant="outlined" onClick={() => closeModal()}>
            Cancel
          </Button>
          <LoadingButton
            type="submit"
            loading={isPending}
            loadingPosition="center"
            variant="contained"
          >
            <span>{address ? "Edit" : "Create"}</span>
          </LoadingButton>
        </Stack>
      </Stack>
    </form>
  );
};

export default AddressFormComponent;
