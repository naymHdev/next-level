import { baseApi } from "../../api/baseApi";

const corseManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // ----------Manage Semester Endpoints ---------- //
    getAllCourses: builder.query({
      query: () => {
        return {
          url: "/semester-registrations",
          method: "GET",
        };
      },
      transformResponse: (response) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),
    addRegisteredSemester: builder.mutation({
      query: (data) => ({
        url: "/semester-registrations/create-semester-registration",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useGetAllCoursesQuery, useAddRegisteredSemesterMutation } =
  corseManagementApi;
