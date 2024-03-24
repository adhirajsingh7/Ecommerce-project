import axios from "axios";

export const fetchProducts = async (options: any) => {
  const { page = 1, limit = 2 } = options;
  try {
    const { data } = await axios.get(`/products?page=${page}&limit=${limit}`);
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
  try {
    const { data } = await axios.post("/products", product);
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
