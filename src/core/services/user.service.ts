import axios from "axios";
import { IUser } from "../interfaces/user.interface";

const API_URL = "https://6724cf0ac39fedae05b2cef1.mockapi.io/crud/v1/users";

export const getUsers = async () => {
  const { data } = await axios.get<IUser[]>(API_URL);
  return data;
};

export const createUser = async (userData: { name: string; email: string }) => {
  const { data } = await axios.post(API_URL, userData);
  return data;
};

export const updateUser = async (userData: IUser) => {
  const { data } = await axios.put(`${API_URL}/${userData.id}`, userData);
  return data;
};

export const deleteUser = async (id: number) => {
  const { data } = await axios.delete(`${API_URL}/${id}`);
  return data;
};
