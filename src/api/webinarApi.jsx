import { Token } from "./userApi";
import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";
import { URL, WEBINAR,WEBINAR_USER } from "../constant/uri";

export const webinarApi = createApi({
  reducerPath: "webinarApi",
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

  tagTypes: ["Webinar"],

  endpoints: (builder) => ({
    getWebinar: builder.query({
      query: () => ({
        url: WEBINAR,
        method: "GET",
        headers: {
          Authorization: `Bearer ${Token}`,
        },
      }),
    }),

    getWebinarById: builder.query({
      query: (id) => ({
        url: `${WEBINAR}/${id}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${Token}`,
        },
      }),
    }),

    createWebinar: builder.mutation({
      query: (data) => ({
        url: WEBINAR,
        method: "POST",
        headers: {
          Authorization: `Bearer ${Token}`,
        },
        body: data,
      }),
    }),

    updateWebinar: builder.mutation({
      query: ({ id, data }) => ({
        url: `${WEBINAR}/${id}`,
        method: "POST",
        headers: {
          Authorization: `Bearer ${Token}`,
        },
        body: data,
      }),
    }),

    deleteWebinar: builder.mutation({
      query: (id) => ({
        url: `${WEBINAR}/${id}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${Token}`,
        },
      }),
    }),


  }),
});

export const {
  useDeleteWebinarMutation,
  useGetWebinarQuery,
  useCreateWebinarMutation,
  useGetWebinarByIdQuery,
  useUpdateWebinarMutation,
} = webinarApi;

export default webinarApi;
