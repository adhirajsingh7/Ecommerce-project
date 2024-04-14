import { Box, Button, Divider, Stack, Typography } from "@mui/material";
import React, { useEffect, useMemo } from "react";
import FormInputText from "../../Form components/FormInputText";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TAddressSchema, addressSchema } from "../../../lib/type";
import { LoadingButton } from "@mui/lab";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createProduct, updateProduct } from "../../../api/product.api";
import { category_options } from "../../../lib/constants";
import { FormInputDropdown } from "../../Form components/FormInputDropdown";
import { createAddress } from "../../../api/address.api";

const AddressFormComponent = (props: any) => {
  const userId = JSON.parse(localStorage.getItem("userId") || "");
  const { closeModal } = props;
  const queryClient = useQueryClient();

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

  const defaultValues = {
    name: "",
    location: "",
    country: "",
    state: "",
    city: "",
    address: "",
    zip_code: "",
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

  const onSubmit: SubmitHandler<any> = async (data) => {
    console.log(data);
    createAddressMutation(data);
    reset();
    closeModal();
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack direction="column" gap={6} sx={{ minWidth: "600px" }}>
        <Typography variant="h4">Add address</Typography>
        <Stack direction="row" gap={2}>
          <FormInputText
            type="text"
            name={"name"}
            control={control}
            label={"Name"}
          />
          <FormInputText
            type="text"
            name={"location"}
            control={control}
            label={"Location"}
          />
        </Stack>
        <Divider />
        <Stack direction="row" gap={4}>
          <FormInputText
            type="text"
            name={"country"}
            control={control}
            label={"Country"}
          />
          <FormInputText
            type="text"
            name={"state"}
            control={control}
            label={"State"}
          />
          <FormInputText
            type="text"
            name={"city"}
            control={control}
            label={"City"}
          />
        </Stack>
        <FormInputText
          type="text"
          name={"address"}
          control={control}
          label={"Address"}
        />
        <Box sx={{ width: "200px" }}>
          <FormInputText
            type="number"
            name={"zip_code"}
            control={control}
            label={"Zip code"}
          />
        </Box>
        {/* <FormInputDropdown
          name="category"
          control={control}
          label="Category"
          options={category_options}
          error={errors.category}
        /> */}
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
            <span>Create</span>
          </LoadingButton>
        </Stack>
      </Stack>
    </form>
  );
};

export default AddressFormComponent;
