import axios from "axios";

export const fetchOrders = async (options: any) => {
  const {
    page = 0,
    rowsPerPage: limit = 5,
    // sortProducts: sortBy = "",
    userId
  } = options || {};
  try {
    const { data } = await axios.get(`/orders?page=${page}&limit=${limit}&user_id=${userId}`);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const fetchOrderById = async (orderId: string) => {
  try {
    const { data } = await axios.get(`/orders/${orderId}`);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const createOrder = async (order: any) => {
  try {
    const response = await axios.post(`/orders/`, order);
    return response?.data;
  } catch (error) {
    console.log(error);
  }
};

export const updateOrder = async (orderId: string, order: any) => {
  try {
    const { data } = await axios.put(`/orders/${orderId}`, order);
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
