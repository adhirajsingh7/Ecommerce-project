import React from "react";
import { Box, Button, Divider, Paper, Stack, Typography } from "@mui/material";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import WorkOutlineOutlinedIcon from "@mui/icons-material/WorkOutlineOutlined";
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";

const addressIcons = {
  home: <HomeOutlinedIcon />,
  office: <WorkOutlineOutlinedIcon />,
  other: <PlaceOutlinedIcon />,
};

const AddressCardComponent = (props: any) => {
  const {
    name,
    phone,
    pincode,
    city,
    state,
    country,
    locality,
    flat_no,
    landmark,
    address_type,
  } = props;

  return (
    <Stack
      direction="column"
      sx={{ p: 2, width: "400px" }}
      component={Paper}
      gap={1}
    >
      <Stack direction="row" gap={2} alignItems="center">
        {addressIcons[address_type]}
        <Typography variant="body1">{name}</Typography>
      </Stack>
      <Typography variant="body2">
        {flat_no}, {landmark ? landmark + "," : ""} {locality}, {city}, {state},{" "}
        {country} - {pincode}
      </Typography>
      <Typography variant="body2">
        Phone: <span style={{ fontWeight: 600 }}>{phone}</span>
      </Typography>
      <Divider />
      <Stack direction="row">
        <Button color="error" sx={{ textTransform: "none" }}>
          Delete
        </Button>
        <Button sx={{ textTransform: "none" }}>Edit</Button>
      </Stack>
    </Stack>
  );
};

export default AddressCardComponent;
