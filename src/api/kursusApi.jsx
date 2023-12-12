import { URL, KURSUS } from "../constant/uri";
import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";
import { Token } from "./userApi";

export const kursusApi = createApi({
  reducerPath: "kursusApi",
  baseQuery: fetchBaseQuery({
    baseUrl: URL,
    prepareHeaders: (headers) => {
      headers.set("Authorization", `Bearer ${Token}`);
      return headers;
    },
  }),
  tagTypes: ["Kursus"],
  endpoints: (builder) => ({
    getKursus: builder.query({
      query: () => ({
        url: KURSUS,
        method: "GET",
        headers: {
          Authorization: `Bearer ${Token}`,
        },
      }),
    }),
    deleteKursus: builder.mutation({
      query: (id) => ({
        url: `${KURSUS}/${id}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${Token}`,
        },
      }),
    }),

    createKursus: builder.mutation({
      query: (data) => ({
        url: KURSUS,
        method: "POST",
        headers: {
          Authorization: `Bearer ${Token}`,
        },
        body: data,
      }),
    }),

    getKursusById: builder.query({
      query: (id) => ({
        url: `${KURSUS}/${id}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${Token}`,
        },
      }),
    }),

    updateKursus: builder.mutation({
      query: ({ id, data }) => ({
        url: `${KURSUS}/${id}`,
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${Token}`,
        },
        body: data,
      }),
    }),
  }),
});

export const { useGetKursusQuery, useDeleteKursusMutation, useCreateKursusMutation, useGetKursusByIdQuery, useUpdateKursusMutation } = kursusApi;

export default kursusApi;

// https://drive.google.com/file/d/1uwoIE--mZIzDYX5RTbW7U4Au0aMg-NsD/view?usp=sharing
