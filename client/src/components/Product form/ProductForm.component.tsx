import { Box, Stack, Typography } from "@mui/material";
import React, { useEffect, useMemo } from "react";
import FormInputText from "../Form components/FormInputText";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TProductSchema, productSchema } from "../../lib/type";
import { LoadingButton } from "@mui/lab";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createProduct, updateProduct } from "../../api/product.api";
import { category_options } from "../../lib/constants";
import { FormInputDropdown } from "../Form components/FormInputDropdown";

const ProductFormComponent = (props: any) => {
  const { title, product, closeModal, setSearch, setPage } = props;
  const queryClient = useQueryClient();
  // console.log(product);

  const {
    isPending,
    isError,
    error,
    mutate: createProductMutation,
  } = useMutation({
    mutationFn: (product) => createProduct(product),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });

  const {
    isPending: isUpdatePending,
    isError: isUpdateError,
    error: updateError,
    mutate: updateProductMutation,
  } = useMutation({
    mutationFn: (updatedProduct) => updateProduct(product?._id, updatedProduct),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });

  const defaultValues = {
    name: "",
    description: "",
    price: "",
    stock: "",
    category: "",
    image: "",
  };

  useEffect(() => {
    // console.log("Reset");
    reset(product);
  }, [product]);

  const {
    register,
    handleSubmit,
    watch,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<TProductSchema>({
    defaultValues: useMemo(() => {
      // console.log("Product has changed");
      return product ? product : defaultValues;
    }, [props]),
    resolver: zodResolver(productSchema),
  });

  const onSubmit: SubmitHandler<any> = async (data) => {
    if (product) {
      updateProductMutation(data);
      closeModal();
    } else {
      createProductMutation(data);
    }
    setSearch("");
    setPage(0);
    // reset();
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
      <Stack direction="column" gap={2} sx={{ width: "400px" }}>
        <Typography variant="h4">
          {product ? "Edit Product" : "Create Product"}
        </Typography>
        <Stack direction="row" gap={2}>
          <Typography variant="body1">Product Image</Typography>
          <input type="file" {...register("image")} />
        </Stack>
        <FormInputText
          type="text"
          name={"name"}
          control={control}
          label={"Name"}
        />
        <FormInputText
          type="text"
          name={"description"}
          control={control}
          label={"Description"}
        />
        <FormInputText
          type="number"
          name={"price"}
          control={control}
          label={"Price"}
        />
        <FormInputText
          type="number"
          name={"stock"}
          control={control}
          label={"Stock"}
        />
        <FormInputDropdown
          name="category"
          control={control}
          label="Category"
          options={category_options}
          error={errors.category}
        />
        <LoadingButton
          type="submit"
          loading={isPending}
          loadingPosition="center"
          variant="contained"
        >
          <span>{product ? "Edit product" : "Create product"}</span>
        </LoadingButton>
      </Stack>
    </form>
  );
};

export default ProductFormComponent;
