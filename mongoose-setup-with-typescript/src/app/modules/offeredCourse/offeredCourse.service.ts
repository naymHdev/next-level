import { StatusCodes } from 'http-status-codes';
import AppError from '../../errors/appError';
import { SemesterRegistration } from '../semesterRegistration/semesterRegistration.model';
import { TOfferedCourse } from './offeredCourse.interface';
import { OfferedCourse } from './offeredCourse.model';

const createOfferedCourseIntoDB = async (payload: TOfferedCourse) => {
  const {
    semesterRegistration,
    academicFaculty,
    academicDepartment,
    course,
    faculty,
  } = payload;

  // * Step 1: check if the semester registration id is exists!
  const isSemesterRegistrationExits =
    await SemesterRegistration.findById(semesterRegistration);
  if (!isSemesterRegistrationExits) {
    throw new AppError(
      StatusCodes.NOT_FOUND,
      'Semester registration not found !',
    );
  }

  const academicSemester = isAcademicDepartmentsExits?.academicSemester;

  // * Step 2: check if the academic faculty id is exists!
  const isAcademicFacultyExits =
    await SemesterRegistration.findById(academicFaculty);
  if (!isAcademicFacultyExits) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Academic faculty not found !');
  }

  // * Step 3: check if the academic department id is exists!
  const isAcademicDepartmentsExits =
    await SemesterRegistration.findById(academicDepartment);
  if (!isAcademicDepartmentsExits) {
    throw new AppError(
      StatusCodes.NOT_FOUND,
      'Academic department not found !',
    );
  }

  // * Step 4: check if the course id is exists!
  const isCourseExits = await SemesterRegistration.findById(course);
  if (!isCourseExits) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Course not found !');
  }

  // * Step 5: check if the faculty id is exists!
  const isFacultyExits = await SemesterRegistration.findById(faculty);
  if (!isFacultyExits) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Faculty not found !');
  }

  // * Step 6: check if the department is belong to the  faculty
  // * Step 7: check if the same offered course same section in same registered semester exists
  // * Step 8: get the schedules of the faculties
  // * Step 9: check if the faculty is available at that time. If not then throw error
  // * Step 10: create the offered course

  const result = await OfferedCourse.create({ ...payload, academicSemester });
  return result;
};

const getAllOfferedCourseFromDB = async () => {
  const result = await OfferedCourse.find()
    .populate('semesterRegistration')
    .populate('academicSemester')
    .populate('academicFaculty')
    .populate('academicDepartment')
    .populate('course')
    .populate('faculty');
  return result;
};

export const OfferCourseService = {
  createOfferedCourseIntoDB,
  getAllOfferedCourseFromDB,
};
