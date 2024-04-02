import {
  Avatar,
  Box,
  Button,
  Paper,
  Rating,
  Stack,
  Typography,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { fetchReviews } from "../../api/review.api";

export const ReviewCard = () => {
  return (
    <Stack
      direction="row"
      justifyContent="space-around"
      alignItems="center"
      sx={{ width: "400px", border: 1, p: 2 }}
    >
      <Avatar>A</Avatar>
      <Stack direction="column">
        <Typography variant="h4">Title</Typography>
        <Stack direction="row" gap={2}>
          <Rating name="product-rating" value={3} readOnly />
          <Typography>created at</Typography>
        </Stack>
        <Typography>description</Typography>
      </Stack>
    </Stack>
  );
};

const ReviewsComponent = () => {

    const {isPending, isError, error, data} = useQuery({
        queryKey: ["Reviews"],
        queryFn: () => fetchReviews()
        
    })

  return (
    <>
      <Stack direction="column" alignItems="center" gap={5}>
        <Stack
          direction="row"
          justifyContent="space-around"
          sx={{ width: 1 / 2 }}
        >
          <Typography variant="h4">Reviews</Typography>
          <Button variant="outlined">Write a review</Button>
        </Stack>
        <ReviewCard />
      </Stack>
    </>
  );
};

export default ReviewsComponent;
