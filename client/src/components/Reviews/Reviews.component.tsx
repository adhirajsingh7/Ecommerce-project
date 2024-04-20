import React from "react";
import { CircularProgress, Pagination, Stack, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { ReviewStatsComponent } from "./ReviewStats.component";
import { CreateReviewComponent } from "./CreateReview.component";
import { ReviewCard } from "./ReviewCard.component";
import { useGetReviews } from "@/features/reviews/api/getReviews";

export const ReviewsComponent = () => {
  const [page, setPage] = React.useState(0);
  const rowsPerPage = 2;
  const params = useParams();
  const productId = params?.product_id || "";

  const { isPending, data: reviewsList } = useGetReviews({
    page,
    rowsPerPage,
    productId,
  });

  if (isPending) return <CircularProgress />;

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value - 1);
  };

  return (
    <>
      <Stack direction="row" justifyContent="space-around">
        <ReviewStatsComponent {...reviewsList} />
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
          {reviewsList?.data?.map((review: any, index: number) => (
            <ReviewCard key={index} {...review} />
          ))}
          <Stack direction="row" justifyContent="center" sx={{ p: 4 }}>
            {reviewsList?.data?.length !== 0 ? (
              <Pagination
                color="secondary"
                count={reviewsList?.total_page}
                page={page + 1}
                onChange={handleChange}
              />
            ) : (
              <Typography sx={{ p: 2 }} variant="h4" textAlign="center">
                No Reviews found
              </Typography>
            )}
          </Stack>
        </Stack>
      </Stack>
    </>
  );
};