import { baseApi } from "../../api/baseApi";

const userManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getStudentData: builder.query({
      query: () => {
        return {
          url: "/students",
          method: "GET",
        };
      },
    }),
    addStudent: builder.mutation({
      query: (data) => ({
        url: "/users/create-student",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useGetStudentDataQuery, useAddStudentMutation } =
  userManagementApi;
