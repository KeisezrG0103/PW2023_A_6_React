import { URL,USER, DELETE_USER } from "../constant/uri";
import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";

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

    getUserLoggedIn: builder.query({
      query: () => ({
        url: "/user",
        method: "GET",
        headers: {
          Authorization: `Bearer ${Token}`,
        },
        providesTags : ["User"]
      }),
    }),

    updateUser: builder.mutation({
      query: (data) => ({
        url: `/user`,
        method: "POST",
        headers: {
          Authorization: `Bearer ${Token}`,
        },
        body: data,
      }),
    }),

    getUserById: builder.query({
      query: (id) => ({
        url: `get_user/${id}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${Token}`,
        },

        providesTags: ["User"],
      })
    }),
  }),
});

export const { useGetUserQuery, useDeleteUserMutation, useGetUserLoggedInQuery, useUpdateUserMutation, useGetUserByIdQuery } = getUser;
export default getUser;
