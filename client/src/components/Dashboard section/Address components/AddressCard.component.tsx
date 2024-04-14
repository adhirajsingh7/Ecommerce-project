import {
  Box,
  CircularProgress,
  IconButton,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import WorkOutlineOutlinedIcon from "@mui/icons-material/WorkOutlineOutlined";
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";

const addressIcons = {
  Home: <HomeOutlinedIcon />,
  Work: <WorkOutlineOutlinedIcon />,
  Other: <PlaceOutlinedIcon />,
};

const AddressCardComponent = (props: any) => {
  const { address, location, country, state, city, name, zip_code } = props;
  console.log(location);
  return (
    <Stack
      direction="row"
      justifyContent="flex-end"
      sx={{ p: 2, width: 1 / 2 }}
      component={Paper}
    >
      <Stack direction="row" gap={2}>
        {/* <HomeOutlinedIcon /> */}
        {addressIcons[location]}
        <Stack direction="column" gap={1}>
          <Typography variant="body1" fontWeight={600}>
            {location}
          </Typography>

          <Typography variant="body1" sx={{ color: "#828282" }}>
            <span style={{ color: "black" }}> {name} </span>
            {zip_code}, {address}, {country}, {state}, {city}
          </Typography>
          {/* <Typography variant="body1" sx={{ color: "#828282" }}>
            <span style={{ color: "black" }}> Richa Hussein </span>
            11,01,, Paper Street Soap Ltd., Institutional Area, Lodi Colony,New
            Delhi
          </Typography> */}
        </Stack>
      </Stack>
      <Stack
        direction="row"
        gap={2}
        sx={{
          height: "fit-content",
          color: "#b1b1b1",
        }}
      >
        <Typography
          variant="body1"
          sx={{
            "&:hover": {
              color: "black",
              textDecoration: "underline",
              cursor: "pointer",
            },
          }}
        >
          Edit
        </Typography>
        <Typography
          variant="body1"
          sx={{
            "&:hover": {
              color: "black",
              textDecoration: "underline",
              cursor: "pointer",
            },
          }}
        >
          Delete
        </Typography>
      </Stack>
    </Stack>
  );
};

export default AddressCardComponent;
