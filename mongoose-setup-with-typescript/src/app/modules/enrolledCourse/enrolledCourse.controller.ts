import { StatusCodes } from 'http-status-codes';
import { catchAsync } from '../../utils/catchAsync';
import { sendResponse } from '../../utils/sendResponse';
import { EnrolledCourseService } from './enrolledCourse.service';

const createEnrollCourse = catchAsync(async (req, res) => {
  const userId = req.user.userId;

  const result = await EnrolledCourseService.createEnrollCourseFromDB(
    userId,
    req.body,
  );

  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: 'Course enrolled successfully',
    data: result,
  });
});

const getMyEnrollCourses = catchAsync(async (req, res) => {
  const studentId = req.user.userId;

  const result = await EnrolledCourseService.getMyEnrolledCoursesFromDB(
    studentId,
    req.query,
  );

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Course retrieved successfully',
    meta: result?.meta,
    data: result?.result,
  });
});

const updateEnrolledCourseMarks = catchAsync(async (req, res) => {
  const facultyId = req.user.userId;

  const result = await EnrolledCourseService.updateEnrolledCourseMarksFromDB(
    facultyId,
    req.body,
  );

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Course marks updated successfully',
    data: result,
  });
});

export const EnrolledCourseController = {
  createEnrollCourse,
  getMyEnrollCourses,
  updateEnrolledCourseMarks,
};
