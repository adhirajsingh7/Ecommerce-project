import axios from "axios";
import { toast } from "react-toastify";

export const fetchUsers = async (options: any) => {
  const {
    page = 0,
    rowsPerPage: limit = 10,
    debouncedSearch: name = "",
  } = options || {};

  try {
    const { data } = await axios.get(
      `/users?page=${page}&limit=${limit}&name=${name}`
    );
    return data;
  } catch (error) {
    console.log(error);
    throw Error(error);
  }
};

export const fetchUserById = async (userId: string) => {
  try {
    const { data } = await axios.get(`/users/${userId}`);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const createUser = async (user: any) => {
  const formData = new FormData();
  formData.append("username", user.username);
  formData.append("email", user.email);
  formData.append("password", user.password);
  formData.append("full_name", user.full_name);
  formData.append("mobile", user.mobile);
  formData.append("role", user.role);
  formData.append("avatar", user.avatar[0] || "");

  try {
    const response = await axios.post("/users/signup", formData);
    toast.success("User registered successfully!");
    return response?.data;
  } catch (error) {
    console.log(error);
    toast.error(error?.response?.data?.message || "User registration failed!");
  }
};

export const updateUser = async (userId: string, user: any) => {
  try {
    const { data } = await axios.put(`/users/${userId}`, user);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteUser = async (userId: string) => {
  try {
    const { data } = await axios.delete(`/users/${userId}`);
    return data;
  } catch (error) {
    console.log(error);
  }
};
