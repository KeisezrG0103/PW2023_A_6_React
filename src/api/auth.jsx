import axios from "axios";
import { URL, LOGIN, REGISTER, LOGOUT } from "../constant/uri";
import { redirect } from "react-router-dom";
import { Token } from "./userApi";


export const login = async (email, password) => {
  const data = {
    email: email,
    password: password,
  };

  const response = await axios.post(URL + LOGIN, data);
  return response.data;
};

export const User_Register = async (username, email, password, education, coding_experience) => {
  
  const response = await axios.post(URL + REGISTER, {
    username: username,
    email: email,
    password: password,
    education: education,
    coding_experience: coding_experience,
  });
  return response.data;
}


export const logout = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("token");
  redirect("/");
};


export const Logout = () => {
  const response = axios.get(URL + LOGOUT, {
    headers: {
      Authorization: `Bearer ${Token}`,
    },
  });
  return response.data;
}

