import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";

export const updateProduct = async (productId: string, product: any) => {
  const formData = new FormData();

  if (product.name) formData.append("name", product.name);
  if (product.description) formData.append("description", product.description);
  if (product.price) formData.append("price", product.price);
  if (product.stock) formData.append("stock", product.stock);
  if (product.category) formData.append("category", product.category);
  if (product.image) formData.append("image", product.image[0] || "");

  for (let data of formData) console.log(data);

  try {
    const { data } = await axios.put(`/products/${productId}`, formData);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const useUpdateProduct = (productId: string, closeModal) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (updatedProduct) => updateProduct(productId, updatedProduct),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      toast.success("Product updated successfully!");
      closeModal();
    },
  });
};
