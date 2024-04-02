import axios from "axios";

export const fetchReviews = async (options: any) => {
  const { page = 0, rowsPerPage: limit = 10, productId = "" } = options || {};

  try {
    const { data } = await axios.get(
      `/reviews?page=${page}&limit=${limit}&product_id=${productId}`
    );
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const fetchReviewById = async (reviewId: string) => {
  try {
    const { data } = await axios.get(`/reviews/${reviewId}`);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const createReview = async (
  userId: string,
  productId: string,
  review: IReview
) => {
  try {
    const response = await axios.post(
      `/reviews/${userId}/${productId}`,
      review
    );
    return response?.data;
  } catch (error) {
    console.log(error);
  }
};

export const updateReview = async (reviewId: string, review: any) => {
  try {
    const { data } = await axios.put(`/reviews/${reviewId}`, review);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteReview = async (reviewId: string) => {
  try {
    const { data } = await axios.delete(`/reviews/${reviewId}`);
    return data;
  } catch (error) {
    console.log(error);
  }
};
