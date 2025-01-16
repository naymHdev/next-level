import { baseApi } from "../../api/baseApi";

const academicFacultyApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllAcademicFaculty: builder.query({
      query: () => {
        return {
          url: "/academic-faculties",
          method: "GET",
        };
      },
    }),
    addAcademicFaculty: builder.mutation({
      query: (data) => ({
        url: "/academic-faculties/create-academic-faculty",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useGetAllAcademicFacultyQuery, useAddAcademicFacultyMutation } =
  academicFacultyApi;
