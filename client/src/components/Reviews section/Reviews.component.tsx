import React from "react";
import {
  Avatar,
  Box,
  Button,
  Pagination,
  Paper,
  Rating,
  Stack,
  TablePagination,
  Typography,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { fetchReviews } from "../../api/review.api";
import CreateReviewComponent from "./Create Review/CreateReview.component";
import { useParams } from "react-router-dom";
import "./Reviews.styles.scss";
import ReviewStatsComponent from "./ReviewStats.component";

export const ReviewCard = (props: any) => {
  const { title, content, rating, user_id, created_at } = props;

  return (
    <Stack
      className="review-card"
      direction="row"
      justifyContent="space-around"
      alignItems="center"
      component={Paper}
      elevation={2}
      sx={{
        height: "auto",
        width: "400px",
        p: 2,
      }}
    >
      <Avatar>{user_id.full_name.toUpperCase().charAt(0)}</Avatar>
      <Stack direction="column">
        <Stack direction="row" gap={2}>
          <Rating name="product-rating" value={rating} readOnly />
          <Typography variant="subtitle1" fontWeight={800}>
            {title}
          </Typography>
        </Stack>
        <Box
          sx={{
            maxWidth: "300px",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {content}
        </Box>
        <Typography variant="caption" textAlign="right">
          {new Date(created_at).toDateString()}
        </Typography>
      </Stack>
    </Stack>
  );
};

const ReviewsComponent = () => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(2);
  const params = useParams();
  const productId = params?.product_id || "";
  // console.log(params)

  const {
    isPending,
    isError,
    error,
    data: reviewsData,
  } = useQuery({
    queryKey: ["reviews", { page, rowsPerPage }],
    queryFn: () => fetchReviews({ productId, page, rowsPerPage }),
  });

  // console.log(reviewsData);

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value - 1);
  };

  return (
    <>
      <Stack direction="row" justifyContent="space-around">
        <ReviewStatsComponent {...reviewsData} />
        <Stack
          direction="column"
          alignItems="center"
          gap={5}
          sx={{ width: 1 / 2 }}
        >
          <Stack
            direction="row"
            justifyContent="space-around"
            sx={{ width: 1 / 2 }}
          >
            <Typography variant="h4">Reviews</Typography>
            <CreateReviewComponent />
          </Stack>
          {reviewsData?.data?.map((review: any, index: number) => (
            <ReviewCard key={index} {...review} />
          ))}
          <Stack direction="row" justifyContent="center" sx={{ p: 4 }}>
            {reviewsData?.data?.length !== 0 ? (
              <Pagination
                color="secondary"
                count={reviewsData?.total_page}
                page={page + 1}
                onChange={handleChange}
              />
            ) : (
              <Typography sx={{ p: 2 }} variant="h4" textAlign="center">
                No Comments found
              </Typography>
            )}
          </Stack>
        </Stack>
      </Stack>
    </>
  );
};

export default ReviewsComponent;
