import { StatusCodes } from 'http-status-codes';
import AppError from '../../errors/appError';
import { TOfferedCourse } from './offeredCourse.interface';
import { OfferedCourse } from './offeredCourse.model';
import { SemesterRegistration } from '../semesterRegistration/semesterRegistration.model';
import { AcademicFaculty } from '../academicFaculty/academicFaculty.model';
import { AcademicDepartment } from '../academicDepartment/academicDepartment.model';
import { Course } from '../course/course.model';
import { Faculty } from '../faculty/faculty.model';
import hasTimeConflict from './offeredCourse.utils';

const createOfferedCourseIntoDB = async (payload: TOfferedCourse) => {
  const {
    semesterRegistration,
    academicFaculty,
    academicDepartment,
    course,
    faculty,
    section,
    days,
  } = payload;

  // * Step 1: check if the semester registration id is exists!
  const isSemesterRegistrationExits =
    await SemesterRegistration.findById(semesterRegistration);
  if (!isSemesterRegistrationExits) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      'Semester registration not found !',
    );
  }

  const academicSemester = isSemesterRegistrationExits?.academicSemester;

  // * Step 2: check if the academic faculty id is exists!
  const isAcademicFacultyExits =
    await AcademicFaculty.findById(academicFaculty);

  if (!isAcademicFacultyExits) {
    throw new AppError(StatusCodes.BAD_REQUEST, 'Academic Faculty not found !');
  }

  // * Step 3: check if the academic department id is exists!
  const isAcademicDepartmentsExits =
    await AcademicDepartment.findById(academicDepartment);
  if (!isAcademicDepartmentsExits) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      'Academic department not found !',
    );
  }

  // * Step 4: check if the course id is exists!
  const isCourseExits = await Course.findById(course);
  if (!isCourseExits) {
    throw new AppError(StatusCodes.BAD_REQUEST, 'Course not found !');
  }

  // * Step 5: check if the faculty id is exists!
  const isFacultyExits = await Faculty.findById(faculty);
  if (!isFacultyExits) {
    throw new AppError(StatusCodes.BAD_REQUEST, 'Faculty not found !');
  }

  // * Step 6: check if the department is belong to the  faculty
  const isDepartmentBelongToFaculty = await AcademicDepartment.findOne({
    _id: academicDepartment,
    academicFaculty,
  });
  if (!isDepartmentBelongToFaculty) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      `This "${isAcademicDepartmentsExits?.name}" is not belong to this "${isAcademicFacultyExits?.name}"`,
    );
  }

  // * Step 7: check if the same offered course same section in same registered semester exists
  const isSameOfferedCourseExistsWithSameRegisteredSemesterWithSameSection =
    await OfferedCourse.findOne({
      semesterRegistration,
      course,
      section,
    });
  if (isSameOfferedCourseExistsWithSameRegisteredSemesterWithSameSection) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      `Offered course with same section is already exist!`,
    );
  }

  // * Step 8: get the schedules of the faculties
  const assignSchedule = await OfferedCourse.find({
    semesterRegistration,
    faculty,
    days: { $in: days },
  }).select('days startTime endTime');

  const newSchedule = {
    days,
    startTime,
    endTime,
  };

  // * Step 9: check if the faculty is available at that time. If not then throw error
  if (hasTimeConflict(assignSchedule, newSchedule)) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      'This faculty not available its time! Choose another time or day',
    );
  }

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

const updateOfferedCourseFromDB = async (
  id: string,
  payload: Pick<TOfferedCourse, 'faculty' | 'days' | 'startTime' | 'endTime'>,
) => {
  const { faculty, days, startTime, endTime } = payload;

  const isOfferCourseExists = await OfferedCourse.findById(id);
  if (!isOfferCourseExists) {
    throw new AppError(StatusCodes.BAD_REQUEST, 'Offered course not found!');
  }

  const isFacultyExists = await Faculty.findById(faculty);
  if (!isFacultyExists) {
    throw new AppError(StatusCodes.BAD_REQUEST, 'Faculty not found!');
  }

  // * Step 1: get the schedules of the faculties
  const semesterRegistration = isOfferCourseExists.semesterRegistration;

  // If semester status ongoing than not update-able
  const semesterRegistrationStatus =
    await SemesterRegistration.findById(semesterRegistration);
  if (semesterRegistrationStatus?.status !== 'UPCOMING') {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      'Course already ongoing that wise updated not possible',
    );
  }

  const assignSchedule = await OfferedCourse.find({
    semesterRegistration,
    faculty,
    days: { $in: days },
  }).select('days startTime endTime');

  const newSchedule = {
    days,
    startTime,
    endTime,
  };

  // * Step 2: check if the faculty is available at that time. If not then throw error
  if (hasTimeConflict(assignSchedule, newSchedule)) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      'This faculty not available its time! Choose another time or day',
    );
  }

  const result = await OfferedCourse.findByIdAndUpdate(id, payload, {
    new: true,
  });

  return result;
};

export const OfferCourseService = {
  createOfferedCourseIntoDB,
  getAllOfferedCourseFromDB,
  updateOfferedCourseFromDB,
};
