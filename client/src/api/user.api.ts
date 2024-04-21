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

  // for(let data of formData) console.log(data)

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
  const formData = new FormData();
  // console.log(user);
  if (user.username) formData.append("username", user.username);
  if (user.email) formData.append("email", user.email);
  if (user.full_name) formData.append("full_name", user.full_name);
  if (user.mobile) formData.append("mobile", user.mobile);
  if (user.role) formData.append("role", user.role);
  if (user.avatar) formData.append("avatar", user.avatar[0] || "");
  // password update
  if (user.new_password) {
    formData.append("new_password", user.new_password);
    formData.append("previous_password", user.previous_password);
  }
  for (let data of formData) console.log(data);

  try {
    const { data } = await axios.put(`/users/${userId}`, formData);
    return data;
  } catch (error) {
    console.log(error);
    return error;
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
