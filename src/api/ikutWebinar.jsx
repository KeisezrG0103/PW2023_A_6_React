import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";
import { URL, WEBINAR_USER } from "../constant/uri";
export const Token = localStorage.getItem("Token");

export const webinarUserApi = createApi({
  reducerPath: "webinarUserApi",
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

  tagTypes: ["WebinarUser"],

  endpoints: (builder) => ({
    getWebinarUser: builder.query({
      query: () => ({
        url: WEBINAR_USER,
        method: "GET",
        headers: {
          Authorization: `Bearer ${Token}`,
        },
      }),
    }),
    createWebinarUser: builder.mutation({
      query: (data) => ({
        url: WEBINAR_USER,
        method: "POST",
        headers: {
          Authorization: `Bearer ${Token}`,
        },
        body: data,
      }),
    }),
  }),
});

export const { useGetWebinarUserQuery, useCreateWebinarUserMutation } =
  webinarUserApi;

export default webinarUserApi;
