import { useQuery } from "@tanstack/react-query";
import axios from "axios";

type TProductId = string | undefined;

export const fetchProductById = async (productId: TProductId) => {
  try {
    const { data } = await axios.get(`/products/${productId}`);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const useGetProductById = (productId: TProductId) => {
  return useQuery<IProduct>({
    queryKey: ["products"],
    queryFn: () => fetchProductById(productId),
  });
};
