import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import axios from "axios";

export const createProduct = async (product: any) => {
  const formData = new FormData();
  formData.append("name", product.name);
  formData.append("description", product.description);
  formData.append("price", product.price);
  formData.append("stock", product.stock);
  formData.append("category", product.category);
  formData.append("image", product.image[0] || "");

  try {
    const { data } = await axios.post("/products", formData);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const useCreateProduct = (setSearch, setPage, closeModal) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (product) => createProduct(product),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      toast.success("Product added successfully!");
      setSearch("");
      setPage(0);
      closeModal();
    },
  });
};
