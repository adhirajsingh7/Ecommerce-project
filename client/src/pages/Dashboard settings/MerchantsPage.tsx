import { Box, Stack, Typography, Button } from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TProductSchema, productSchema } from "../../lib/type";
import { LoadingButton } from "@mui/lab";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createProduct, updateProduct } from "../../api/product.api";
import { category_options } from "../../lib/constants";
import FormInputText from "../../components/Form components/FormInputText";
import { FormInputDropdown } from "../../components/Form components/FormInputDropdown";
import "./MerchantsPage.styles.scss";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import { useDropzone } from "react-dropzone";
import { toast } from "react-toastify";

const MerchantsPage = (props: any) => {
  const { product, closeModal, setSearch, setPage } = props;
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
    // console.log(files);
    data = {
      ...data,
      image: files,
    };
    // console.log(data);
    createProductMutation(data);

    // if (product) {
    //   updateProductMutation(data);
    //   closeModal();
    // } else {
    //   createProductMutation(data);
    // }
    // setSearch("");
    // setPage(0);
    // reset();
  };

  const baseStyle = {
    borderColor: "#eeeeee",
  };

  const focusedStyle = {
    borderColor: "#2196f3",
  };

  const acceptStyle = {
    borderColor: "#00e676",
  };

  const rejectStyle = {
    borderColor: "#ff1744",
  };

  const { avatar: userAvatar, _id: userId } = props;

  const {
    isPending: isPendingAvatar,
    isError: isErrorAvatar,
    error: errorAvatar,
    mutate,
  } = useMutation({
    throwOnError: true,
    mutationFn: (user) => updateUser(userId, user),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      console.log(data);
      toast.success("Avatar updated successfully!");
    },
    onError: (error) => {
      // Handle the error here
      console.error("An error occurred:", error);
    },
  });

  if (isError) {
    console.log("REACY QUERY ERROR : ", error);
  }

  useEffect(() => {
    setFiles([{ preview: userAvatar }]);
  }, []);
  const [files, setFiles] = useState<any>([]);
  const { getRootProps, getInputProps, isFocused, isDragAccept, isDragReject } =
    useDropzone({
      accept: {
        "image/*": [],
      },
      onDrop: (acceptedFiles) => {
        setFiles(
          acceptedFiles.map((file) =>
            Object.assign(file, {
              preview: URL.createObjectURL(file),
            })
          )
        );
      },
    });

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
  }, []);

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isFocused ? focusedStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isFocused, isDragAccept, isDragReject]
  );

  const avatarContainer = files.map((file, index) => (
    <img
      key={index}
      src={file.preview}
      className="avatar-image"
      // Revoke data uri after image is loaded
      onLoad={() => {
        URL.revokeObjectURL(file.preview);
      }}
    />
  ));

  const handleImageUpload = (e) => {
    e.preventDefault();

    if (Object.keys(files[0]).length > 1) {
      //  upload
      mutate({ avatar: files });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
      {/* sx={{ width: "400px" }} */}
      <Stack direction="column" gap={2}>
        <Typography variant="h4">
          {product ? "Edit Product" : "Create Product"}
        </Typography>
        <Stack
          direction="column"
          gap={2}
          sx={{ border: 1, bgcolor: "#FBFCFF", borderColor: "#dee0e3", p: 2 }}
        >
          <Stack
            direction="row"
            gap={4}
            className="container"
            sx={{ width: 1 }}
          >
            {avatarContainer}
            <Stack direction="column" gap={2}>
              <Box
                {...getRootProps({
                  className: "dropzone-container",
                  style,
                })}
              >
                <input {...getInputProps()} />
                <Stack
                  direction="column"
                  justifyContent="center"
                  alignItems="center"
                  gap={2}
                >
                  <Box className="upload-outer-container">
                    <Box className="upload-inner-container">
                      <CloudUploadOutlinedIcon style={{ color: "#15c4da" }} />
                    </Box>
                  </Box>
                  <Typography variant="body2">
                    <span style={{ fontWeight: 600 }}>Click to upload</span> or
                    drag and drop
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#647692" }}>
                    JPG, PNG, or GIF (Recommended size 1000x1000px)
                  </Typography>
                </Stack>
              </Box>
            </Stack>
          </Stack>
        </Stack>
        {/* <Stack direction="row" gap={2}>
          <Typography variant="body1">Product Image</Typography>
          <input type="file" {...register("image")} />
        </Stack> */}
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

export default MerchantsPage;
