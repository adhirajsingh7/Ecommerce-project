import { Box, Button, Stack, Typography } from "@mui/material";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useDropzone } from "react-dropzone";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import "./AvatarUpload.styles.scss";
import { updateUser } from "../../../api/user.api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { LoadingButton } from "@mui/lab";
import { toast } from "react-toastify";

const thumb = {
  display: "inline-flex",
  borderRadius: 50,
  border: "1px solid #0bbfda",
  backgroundColor: "#0bbfda",
  marginBottom: 8,
  marginRight: 8,
  width: 100,
  height: 100,
  padding: 2,
  boxSizing: "border-box",
};

const thumbInner = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  minWidth: 0,
  overflow: "hidden",
  borderRadius: 50,
};

const img = {
  display: "block",
  width: "auto",
  height: "100%",
  // objectFit: "cover"
};

const baseStyle = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "20px",
  borderWidth: 2,
  borderRadius: 2,
  borderColor: "#eeeeee",
  borderStyle: "dashed",
  backgroundColor: "#fafafa",
  //   color: "#bdbdbd",
  outline: "none",
  transition: "border .24s ease-in-out",
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

const AvatarUploadComponent = (props: any) => {
  const { avatar: userAvatar, _id: userId } = props;
  //   console.log(userAvatar);

  const queryClient = useQueryClient();

  const { isPending, isError, error, mutate } = useMutation({
    throwOnError: true,
    mutationFn: (user) => updateUser(userId, user),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      console.log(data);
      toast.success("Avatar updated successfully!");
      if (data.code === "ERR_BAD_REQUEST") {
        // console.error("data : ", data.response.data.message);
        // setError("password", {
        //   type: "server",
        //   message: data.response.data.message,
        // });
      }
    },
    onError: (error) => {
      // Handle the error here
      console.error("An error occurred:", error);
    },
  });

  if (isError) {
    console.log("REACY QUERY ERROR : ", error);
  }
  // console.log(userAvatar);
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
  const thumbs = files.map((file, index) => (
    <div style={thumb} key={index}>
      <div style={thumbInner}>
        <img
          src={file.preview}
          style={img}
          // Revoke data uri after image is loaded
          onLoad={() => {
            URL.revokeObjectURL(file.preview);
          }}
        />
      </div>
    </div>
  ));
  //   console.log(files);

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

  const handleImageUpload = (e) => {
    e.preventDefault();
    // console.log(files[0]);
    // console.log(Object.keys(files[0]).length);
    console.log(files);
    mutate({ avatar: files });

    if (Object.keys(files[0]).length > 1) {
      //  upload
      // mutate({ avatar: files });
    }
  };

  return (
    <>
      <Stack
        direction="row"
        justifyContent="space-between"
        sx={{ p: 2, border: 1, borderRadius: "10px", borderColor: "#dee0e3" }}
      >
        <Stack direction="column" sx={{ width: "270px" }}>
          <Typography variant="body1" fontWeight={600}>
            Profile Photo
          </Typography>
          <Typography variant="body2" sx={{ color: "#647692" }}>
            This image will be displayed on your profile
          </Typography>
        </Stack>
        <Stack
          direction="column"
          gap={2}
          sx={{ border: 1, bgcolor: "#FBFCFF", borderColor: "#dee0e3" }}
        >
          <form onSubmit={handleImageUpload} encType="multipart/form-data">
            <Stack direction="row" gap={3} sx={{ p: 2 }} className="container">
              <Stack direction="column">{thumbs}</Stack>
              <div {...getRootProps({ className: "dropzone", style })}>
                <input {...getInputProps()} />
                <Stack
                  direction="column"
                  justifyContent="center"
                  alignItems="center"
                  gap={2}
                >
                  <Box
                    sx={{
                      p: 0.5,
                      border: 1,
                      borderStyle: "dashed",
                      borderRadius: 10,
                      borderColor: "#15c4da",
                      bgcolor: "#ecf9fc",
                    }}
                  >
                    <Stack
                      justifyContent="center"
                      alignItems="center"
                      sx={{
                        p: 0.5,
                        border: 1,
                        borderStyle: "dashed",
                        borderRadius: 10,
                        borderColor: "#15c4da",
                        bgcolor: "#cff2f8",
                      }}
                    >
                      <CloudUploadOutlinedIcon style={{ color: "#15c4da" }} />
                    </Stack>
                  </Box>
                  <Typography variant="body2">
                    <span style={{ fontWeight: 600 }}>Click to upload</span> or
                    drag and drop
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#647692" }}>
                    JPG, PNG, or GIF (Recommended size 1000x1000px)
                  </Typography>
                  {/* <p>Drag 'n' drop some files here, or click to select files</p>
                <p>Drag 'n' drop some files here, or click to select files</p> */}
                </Stack>
              </div>
              {/* <aside style={thumbsContainer}>{thumbs}</aside> */}
            </Stack>
            {/* <form onSubmit={handleImageUpload} encType="multipart/form-data"> */}
            <Stack direction="row" justifyContent="flex-end">
              <Button color="inherit" sx={{ textTransform: "none" }}>
                Cancel
              </Button>
              <LoadingButton
                type="submit"
                loading={isPending}
                loadingPosition="center"
                sx={{ textTransform: "none" }}
              >
                <span>Save</span>
              </LoadingButton>
            </Stack>
          </form>
          {/* </form> */}
        </Stack>
      </Stack>
    </>
  );
};

export default AvatarUploadComponent;
