import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const baseURL = "http://127.0.0.1:8000/api/";

const fetchOrders = async () => {
  const response = await fetch(`${baseURL}orders`);
  if (!response.ok) {
    throw new Error("Orders could not be found");
  }
  const data = await response.json();
  return data.member;
};

const setOrder = async (newOrder) => {
  const response = await fetch(`${baseURL}orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newOrder),
  });
  if (!response.ok) {
    throw new Error("Order could not be added");
  }
  return response.json();
};

const setOrderById = async (newOrder) => {};

export const useGetOrders = () => {
  return useQuery({
    queryKey: ["orders"],
    queryFn: fetchOrders,
  });
};

export const orderAPI = createApi({
  reducerPath: "orderapi",
  baseQuery: fetchBaseQuery({
    baseUrl: baseURL,
  }),
  endpoints: (builder) => ({
    getTasksByUserID: builder.query({
      query: ({ userID }) => ({
        url: `order?id=${userID}`,
        method: "GET",
      }),
      providesTags: ["Tasks"],
    }),

    addTaskToUser: builder.mutation({
      query: ({ newTask }) => ({
        url: "order",
        method: "POST",
        body: newTask,
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["Tasks"],
    }),

    deleteTaskFromUser: builder.mutation({
      query: ({ id }) => ({
        url: `tasks/${id}`,
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["Tasks"],
    }),

    setTaskStatus: builder.mutation({
      query: ({ id, status, userID }) => ({
        url: `tasks/${id}`,
        method: "PATCH",
        body: { status },
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["Tasks"],
    }),
  }),
});

export const {
  useGetTasksByUserIDQuery,
  useAddTaskToUserMutation,
  useDeleteTaskFromUserMutation,
  useSetTaskStatusMutation,
} = orderAPI;
