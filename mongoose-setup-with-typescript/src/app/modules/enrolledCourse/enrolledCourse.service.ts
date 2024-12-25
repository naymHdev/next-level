import { StatusCodes } from 'http-status-codes';
import AppError from '../../errors/AppError';
import { OfferedCourse } from '../offeredCourse/offeredCourse.model';
import { TEnrolledCourse } from './enrolledCourse.interface';
import EnrolledCourse from './enrolledCourse.model';
import { StudentModel } from '../students/studentSchema';

const createEnrollCourseFromDB = async (
  userId: string,
  payload: TEnrolledCourse,
) => {
  /**
   * Step1: Check if the offered cousres is exists
   * Step2: Check if the student is already enrolled
   * Step3: Check if the max credits exceed
   * Step4: Create an enrolled course
   */

  const { offeredCourse } = payload;

  const isOfferedCourseExists = await OfferedCourse.findById(offeredCourse);
  if (!isOfferedCourseExists) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Offered course not found');
  }

  if (isOfferedCourseExists?.maxCapacity <= 0) {
    throw new AppError(StatusCodes.BAD_REQUEST, 'Course is full');
  }

  const student = await StudentModel.findOne({ id: userId }).select('id');
  if (!student) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Student not found');
  }

  const isStudentEnrolled = await EnrolledCourse.findOne({
    semesterRegistration: isOfferedCourseExists?.semesterRegistration,
    offeredCourse,
    student: student._id,
  });

  if (isStudentEnrolled) {
    throw new AppError(StatusCodes.BAD_REQUEST, 'Student already enrolled');
  }

  const result = await EnrolledCourse.create(userId);

  return result;
};

export const EnrolledCourseService = {
  createEnrollCourseFromDB,
};
