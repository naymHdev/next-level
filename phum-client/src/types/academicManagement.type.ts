export type TAcademicSemester = {
  _id: string;
  name: string;
  year: number;
  code: string;
  startMonth: string;
  endMonth: string;
  __v: number;
};

export type TAcademicFaculty = {
  _id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export type TAcademicDepartment = {
  _id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  academicFaculty: TAcademicFaculty;
};
