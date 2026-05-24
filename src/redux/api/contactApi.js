import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const contactApi = createApi({
  reducerPath: "contactApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BACKEND_URL,
  }),

  endpoints: (builder) => ({
    sendContact: builder.mutation({
      query: (body) => ({
        url: "/api/contact",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useSendContactMutation } = contactApi;