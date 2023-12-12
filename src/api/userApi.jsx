import axios from "axios";
import { URL, ADMIN, USER, DELETE_USER } from "../constant/uri";
import { redirect } from "react-router-dom";
import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";
import { useSelector } from "react-redux";

export const Token = localStorage.getItem("Token");

export const getUser = createApi({
    reducerPath: "getUser",
    baseQuery: fetchBaseQuery(
      {
        baseUrl: URL,
      },
      {
        prepareHeaders: (headers) => {
          headers.set("Authorization", `Bearer ${Token}`);
          return headers;
        },
      }
    ),
  
    tagTypes: ["User"],
    endpoints: (builder) => ({
      getUser: builder.query({
        query: () => ({
          url: USER,
          method: "GET",
          headers: {
            Authorization: `Bearer ${Token}`,
          },
        }),
      }),
  
      deleteUser: builder.mutation({
        query: (id) => ({
          url: `${DELETE_USER}/${id}`,
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${Token}`,
          },
        }),
      }),
    }),
  });
  

export const { useGetUserQuery, useDeleteUserMutation } = getUser;
export default getUser;
