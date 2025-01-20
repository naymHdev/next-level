import { TQueryParam, TResponseRedux } from "../../../types";
import { TSemester } from "../../../types/courseManagement.type";
import { baseApi } from "../../api/baseApi";

const corseManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // ----------Manage Semester Endpoints ---------- //
    getAllRegisteredSemesters: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        if (args) {
          args.forEach((item: TQueryParam) => {
            params.append(item.name, item.value as string);
          });
        }

        return {
          url: "/semester-registrations",
          method: "GET",
          params: params,
        };
      },
      providesTags: ["semester"],
      transformResponse: (response: TResponseRedux<TSemester[]>) => {
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
      invalidatesTags: ["semester"],
    }),

    updateRegisteredSemester: builder.mutation({
      query: (args) => ({
        url: `/semester-registrations/${args.id}`,
        method: "PATCH",
        body: args.data,
      }),
      invalidatesTags: ["semester"],
    }),

    // ----------Manage Courses Endpoints ---------- //
    getAllCourses: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        if (args) {
          args.forEach((item: TQueryParam) => {
            params.append(item.name, item.value as string);
          });
        }

        return {
          url: "/courses",
          method: "GET",
          params: params,
        };
      },
      providesTags: ["course"],
      // transformResponse: (response: TResponseRedux<TSemester[]>) => {
      //   return {
      //     data: response.data,
      //     meta: response.meta,
      //   };
      // },
    }),
  }),
});

export const {
  useGetAllRegisteredSemestersQuery,
  useAddRegisteredSemesterMutation,
  useUpdateRegisteredSemesterMutation,
  useGetAllCoursesQuery,
} = corseManagementApi;
