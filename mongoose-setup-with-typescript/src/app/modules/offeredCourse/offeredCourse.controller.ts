import { Request, Response } from 'express';
import { catchAsync } from '../../utils/catchAsync';
import { OfferCourseService } from './offeredCourse.service';
import { sendResponse } from '../../utils/sendResponse';
import { StatusCodes } from 'http-status-codes';

const createOfferCourse = catchAsync(async (req: Request, res: Response) => {
  const result = await OfferCourseService.createOfferedCourseIntoDB(req.body);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Offered course created successfully',
    data: result,
  });
});

const getAllOfferCourse = catchAsync(async (req: Request, res: Response) => {
  const result = await OfferCourseService.getAllOfferedCourseFromDB();

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'All Offered course retrieved successfully',
    data: result,
  });
});

const getMyOfferedCourses = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user.userId;
  const result = await OfferCourseService.getMyOfferedCoursesFromDB(
    userId,
    req.query,
  );

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'OfferedCourses retrieved successfully !',
    meta: result.meta,
    data: result.result,
  });
});

const getSingleOfferCourse = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await OfferCourseService.getSingleOfferedCourseFromDB(id);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'All Offered course retrieved successfully',
    data: result,
  });
});

const updateOfferCourse = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await OfferCourseService.updateOfferedCourseFromDB(
    id,
    req.body,
  );

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'All Offered course retrieved successfully',
    data: result,
  });
});

const deleteOfferCourse = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await OfferCourseService.deleteOfferedCourseFormDB(id);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Offered course deleted successfully',
    data: result,
  });
});

export const OfferCourseController = {
  createOfferCourse,
  getAllOfferCourse,
  updateOfferCourse,
  deleteOfferCourse,
  getSingleOfferCourse,
  getMyOfferedCourses
};
