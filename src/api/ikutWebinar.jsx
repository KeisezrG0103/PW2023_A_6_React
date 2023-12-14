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
      query: (id) => ({
        url: `${WEBINAR_USER}/${id}`,
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

    isRegistered: builder.query({
      query: (id_user, id_webinar) => ({
        url: `${WEBINAR_USER}/${id_user}/${id_webinar}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${Token}`,
        },
      }),
    }),
  }),
});

export const {
  useGetWebinarUserQuery,
  useCreateWebinarUserMutation,
  useIsRegisteredQuery,
} = webinarUserApi;

export default webinarUserApi;
