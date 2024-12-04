import { TAcademicDepartment } from './academicDepartment.interface';
import { AcademicDepartment } from './academicDepartment.model';

const createAcademicDepartmentIntoDb = async (payload: TAcademicDepartment) => {
  const result = await AcademicDepartment.create(payload);
  return result;
};

const getAllAcademicDepartmentFromDb = async () => {
  const result = await AcademicDepartment.find().populate('academicFaculty');
  return result;
};

const getSingleAcademicDepartment = async (id: string) => {
  const res = await AcademicDepartment.findById(id).populate('academicFaculty');
  return res;
};

const updateAcademicDepartment = async (
  id: string,
  payload: TAcademicDepartment,
) => {
  const res = await AcademicDepartment.findOneAndUpdate(
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

export const AcademicDepartmentServices = {
  createAcademicDepartmentIntoDb,
  getAllAcademicDepartmentFromDb,
  getSingleAcademicDepartment,
  updateAcademicDepartment,
};
