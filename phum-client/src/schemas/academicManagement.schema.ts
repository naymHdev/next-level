import z from "zod";

export const academicSemesterSchema = z.object({
  name: z.string({ required_error: "Place select a semester Name" }),
  year: z.string({ required_error: "Place select a semester Year" }),
  startMonth: z.string({
    required_error: "Place select a semester Start Month",
  }),
  endMonth: z.string({ required_error: "Place select a semester End Month" }),
});
