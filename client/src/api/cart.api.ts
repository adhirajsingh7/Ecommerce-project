import axios from "axios";

export const fetchCart = async (options: any) => {
  const { userId } = options || {};
  try {
    const { data } = await axios.get(`/cart?user_id=${userId}`);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const addProductToCart = async (userId: string, product: any) => {
  try {
    const { data } = await axios.post(`/cart/${userId}`, product);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const updateCart = async (cartId: string, updatedProduct: any) => {
  try {
    const { data } = await axios.put(`/cart/${cartId}`, updatedProduct);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const EmptyCart = async (cartId: string) => {
  try {
    const { data } = await axios.delete(`/cart/${cartId}`);
    return data;
  } catch (error) {
    console.log(error);
  }
};
