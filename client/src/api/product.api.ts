import axios from "axios";

export const fetchProducts = async (options: any) => {
  const {
    page = 1,
    rowsPerPage: limit = 5,
    debouncedSearch: name = "",
    categories = [],
    sortProducts: sortBy = "",
  } = options || {};

  let categoriesFilter = "";
  categoriesFilter = categories.join(",");
  try {
    const { data } = await axios.get(
      `/products?page=${page}&limit=${limit}&name=${name}&category=${categoriesFilter}&sortBy=${sortBy}`
    );
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const fetchProductById = async (productId: string) => {
  try {
    const { data } = await axios.get(`/products/${productId}`);
    return data;
  } catch (error) {
    console.log(error);
  }
};

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

export const updateProduct = async (productId: string, product: any) => {
  try {
    const { data } = await axios.put(`/products/${productId}`, product);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteProduct = async (productId: string) => {
  try {
    const { data } = await axios.delete(`/products/${productId}`);
    return data;
  } catch (error) {
    console.log(error);
  }
};
