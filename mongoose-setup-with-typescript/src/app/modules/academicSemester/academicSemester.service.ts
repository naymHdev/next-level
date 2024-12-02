import { TAcademicSemesterCodes } from './academicSemester.interface';
import { AcademicSemester } from './academicSemester.model';

const createAcademicSemesterDB = async (payload: TAcademicSemesterCodes) => {
  const result = await AcademicSemester.create(payload);
  return result;
};

export const AcademicSemesterServices = {
  createAcademicSemesterDB,
};
