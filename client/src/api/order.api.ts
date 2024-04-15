import axios from "axios";

export const createOrder = async (order) => {
  try {
    const response = await axios.post(`/orders/`, order);
    return response?.data;
  } catch (error) {
    console.log(error);
  }
};
