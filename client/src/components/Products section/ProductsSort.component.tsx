import {
  Box,
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";

const ProductsSortComponent = (props: any) => {
  const { sortProducts, setSortProducts, setPage } = props;

  const handleChange = (event: SelectChangeEvent) => {
    setSortProducts(event.target.value as string);
    setPage(0);
  };
  return (
    <>
      {" "}
      <Stack direction="row" justifyContent="flex-end" alignItems="center">
        <Typography variant="body2">Sort by</Typography>
      </Stack>
      <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={sortProducts}
            onChange={handleChange}
          >
            <MenuItem value={"relevance"}>Relevance</MenuItem>
            <MenuItem value={"newest"}>What's New</MenuItem>
            <MenuItem value={"price_high"}>Price (highest first)</MenuItem>
            <MenuItem value={"price_low"}>Price (lowest first)</MenuItem>
          </Select>
        </FormControl>
      </Box>
    </>
  );
};

export default ProductsSortComponent;
