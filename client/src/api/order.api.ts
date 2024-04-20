import axios from "axios";

export const fetchOrderById = async (orderId: string) => {
  try {
    const { data } = await axios.get(`/orders/${orderId}`);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteOrder = async (orderId: string) => {
  try {
    const { data } = await axios.delete(`/orders/${orderId}`);
    return data;
  } catch (error) {
    console.log(error);
  }
};
