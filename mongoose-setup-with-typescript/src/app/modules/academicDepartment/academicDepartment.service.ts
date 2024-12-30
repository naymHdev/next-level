import QueryBuilder from '../../builder/QueryBuilder';
import { TAcademicDepartment } from './academicDepartment.interface';
import { AcademicDepartment } from './academicDepartment.model';

const createAcademicDepartmentIntoDb = async (payload: TAcademicDepartment) => {
  const result = await AcademicDepartment.create(payload);
  return result;
};

const getAllAcademicDepartmentFromDb = async (
  query: Record<string, unknown>,
) => {
  const academicDepartmentQuery = new QueryBuilder(
    AcademicDepartment.find().populate('academicFaculty'),
    query,
  );

  const result = await academicDepartmentQuery.modelQuery;
  const meta = academicDepartmentQuery.countTotal();
  return {
    meta,
    result,
  };
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
