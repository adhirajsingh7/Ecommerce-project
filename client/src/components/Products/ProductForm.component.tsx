import { Box, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoadingButton } from "@mui/lab";
import { TProductSchema, productSchema } from "@/lib/type";
import { category_options } from "@/lib/constants";
import { useCreateProduct } from "@/features/products/api/createProduct";
import { useUpdateProduct } from "@/features/products/api/updateProduct";
import { DropzoneComponent } from "../Elements/Dropzone";
import { FormInputDropdown, FormInputText } from "../Form";

export const ProductForm = (props: any) => {
  const { product, closeModal, setSearch, setPage } = props;
  const [files, setFiles] = useState<any>([]);
  const productId = product?._id;
  // console.log(product);
  // console.log(files);

  const { isPending, mutate: createProductMutation } = useCreateProduct(
    setSearch,
    setPage,
    closeModal
  );
  const { isPending: isUpdatePending, mutate: updateProductMutation } =
    useUpdateProduct(productId, closeModal);

  const defaultValues = {
    name: "",
    description: "",
    price: "",
    stock: "",
    category: "",
    image: "",
  };

  useEffect(() => {
    reset(product);
  }, [product]);

  const {
    register,
    handleSubmit,
    watch,
    control,
    reset,
    formState: { errors },
  } = useForm<TProductSchema>({
    defaultValues,
    resolver: zodResolver(productSchema),
  });

  const onSubmit: SubmitHandler<any> = async (data) => {
    if (files?.[0].preview !== product?.image) {
      console.log("Image changed");
      data.image = files;
    }
    console.log(data);
    if (product) {
      updateProductMutation(data);
    } else {
      createProductMutation(data);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
      <Stack direction="column" gap={2} sx={{ width: "800px" }}>
        <Typography variant="h4">
          {product ? "Edit Product" : "Create Product"}
        </Typography>
        <Stack direction="row" justifyContent="space-between">
          <Typography variant="h6">Product Image</Typography>
          <DropzoneComponent
            files={files}
            setFiles={setFiles}
            displayImage={product?.image}
            displayImageClassName={"product-display-image"}
          />
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
          loading={isPending || isUpdatePending}
          loadingPosition="center"
          variant="contained"
        >
          <span>{product ? "Edit product" : "Create product"}</span>
        </LoadingButton>
      </Stack>
    </form>
  );
};
