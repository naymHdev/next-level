import { TAcademicFaculty } from './academicFaculty.interface';
import { AcademicFaculty } from './academicFaculty.model';

const createAcademicFacultyIntoDb = async (payload: TAcademicFaculty) => {
  const result = await AcademicFaculty.create(payload);
  return result;
};

const getAllAcademicFacultiesFromDb = async () => {
  const result = await AcademicFaculty.find();
  return result;
};

const getSingleAcademicFaculty = async (id: string) => {
  const res = await AcademicFaculty.findById(id);
  return res;
};

const updateAcademicFaculty = async (id: string, payload: TAcademicFaculty) => {
  const res = await AcademicFaculty.findOneAndUpdate(
    {
      _id: id,
    },
    payload,
    {
      new: true,
    },
  );
  return res;
};

export const AcademicFacultyServices = {
  createAcademicFacultyIntoDb,
  getAllAcademicFacultiesFromDb,
  getSingleAcademicFaculty,
  updateAcademicFaculty,
};
