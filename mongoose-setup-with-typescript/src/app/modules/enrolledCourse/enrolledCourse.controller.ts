import { StatusCodes } from 'http-status-codes';
import { catchAsync } from '../../utils/catchAsync';
import { sendResponse } from '../../utils/sendResponse';
import { EnrolledCourseService } from './enrolledCourse.service';

const createEnrollCourse = catchAsync(async (req, res) => {
  const userId = req.user;

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

export const EnrolledCourseController = {
  createEnrollCourse,
};
