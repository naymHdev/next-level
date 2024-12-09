import mongoose from 'mongoose';
import QueryBuilder from '../../builder/QueryBuilder';
import { CourseSearchableFields } from './course.constant';
import { TCourse, TCourseFaculty } from './course.interface';
import { Course, CourseFaculty } from './course.model';
import AppError from '../../errors/appError';
import { StatusCodes } from 'http-status-codes';

const createCourseIntoDB = async (payload: TCourse) => {
  const result = await Course.create(payload);
  return result;
};

const getAllCoursesFromDB = async (query: Record<string, unknown>) => {
  const coursesQuery = new QueryBuilder(
    Course.find().populate('preRequisiteCourses.course'),
    query,
  )
    .search(CourseSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await coursesQuery.modelQuery;
  return result;
};

const getSingleCourseFromDB = async (id: string) => {
  const result = await Course.findById(id).populate(
    'preRequisiteCourses.course',
  );

  return result;
};

// Update courses into DB with dynamically
const updateCourseIntoDB = async (id: string, payload: Partial<TCourse>) => {
  const { preRequisiteCourses, ...courseRemainingData } = payload;

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    // Step -1: Basic course info update
    const updateBasicCourseInfo = await Course.findByIdAndUpdate(
      id,
      courseRemainingData,
      {
        new: true,
        runValidators: true,
        session,
      },
    );

    if (!updateBasicCourseInfo) {
      throw new AppError(StatusCodes.BAD_REQUEST, 'Basic course update failed');
    }

    // Check if there is any preRequisiteCourses to update
    if (preRequisiteCourses && preRequisiteCourses.length) {
      const deletedPreRequests = preRequisiteCourses
        ?.filter((ele) => ele.course && ele.isDeleted)
        .map((ele) => ele.course);

      const deletedPreRequestsCourses = await Course?.findByIdAndUpdate(
        id,
        {
          $pull: {
            preRequisiteCourses: { course: { $in: deletedPreRequests } },
          },
        },
        {
          new: true,
          runValidators: true,
          session,
        },
      );

      if (!deletedPreRequestsCourses) {
        throw new AppError(
          StatusCodes.BAD_REQUEST,
          'Basic course deleted failed',
        );
      }

      // Filter out the course field
      const newPreRequisites = preRequisiteCourses?.filter(
        (el) => el.course && !el.isDeleted,
      );

      const newPreRequisitesCourses = await Course.findByIdAndUpdate(
        id,
        {
          $addToSet: { preRequisiteCourses: { $each: { newPreRequisites } } },
        },
        {
          new: true,
          runValidators: true,
          session,
        },
      );
      if (!newPreRequisitesCourses) {
        throw new AppError(
          StatusCodes.BAD_REQUEST,
          'New PreRequisites Courses  failed',
        );
      }
    }

    await session.commitTransaction();
    await session.endSession();

    const result = await Course.findById(id).populate(
      'preRequisiteCourses.course',
    );

    return result;
  } catch (error: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(StatusCodes.BAD_REQUEST, 'Course updating failed');
  }
};

const deleteCourseFromDB = async (id: string) => {
  const result = await Course.findByIdAndUpdate(
    id,
    {
      isDeleted: true,
    },
    {
      new: true,
    },
  );
  return result;
};

const assignFacultiesWithIntoDb = async (
  id: string,
  payload: Partial<TCourseFaculty>,
) => {
  const result = await CourseFaculty.findByIdAndUpdate(
    id,
    {
      $addToSet: { faculties: { $each: { payload } } },
    },
    {
      upsert: true,
      new: true,
    },
  );
  return result;
};

export const CourseServices = {
  getAllCoursesFromDB,
  getSingleCourseFromDB,
  deleteCourseFromDB,
  createCourseIntoDB,
  updateCourseIntoDB,
  assignFacultiesWithIntoDb,
};
