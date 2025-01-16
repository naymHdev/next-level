export type TAcademicSemester = {
  _id: string;
  name: string;
  year: number;
  code: string;
  startMonth: string;
  endMonth: string;
};

export type TAcademicFaculty = {
  _id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
};

export type TAcademicDepartment = {
  _id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  academicFaculty: TAcademicFaculty;
};
