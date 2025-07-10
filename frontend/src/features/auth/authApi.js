import axios from "axios";

export const loginUserAPI = async (userData) => {
  const res = await axios.post("https://workoai-backend.onrender.com/auth/login", userData);
  return res.data;
};

export const registerUserAPI = async (userData) => {
  const res = await axios.post("https://workoai-backend.onrender.com/auth/register", userData);
  return res.data;
};
