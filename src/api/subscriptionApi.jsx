import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";
import {SUBSCRIBE, URL} from "../constant/uri";
export const Token = localStorage.getItem("Token");

export const subscribeApi = createApi({
    reducerPath: "Subscribe",
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

    tagTypes: ["Subscribe"],

    endpoints: (builder) => ({
        postSubscribe: builder.mutation({
            query: (id) => ({
                url: `${SUBSCRIBE}/${id}`,
                method: "POST",
                headers: {
                    Authorization: `Bearer ${Token}`,
                },
            }),
        }),

    }),
});


export const { usePostSubscribeMutation } = subscribeApi

export default subscribeApi;
