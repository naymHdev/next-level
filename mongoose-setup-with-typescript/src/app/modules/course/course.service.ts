import QueryBuilder from '../../builder/QueryBuilder';
import { CourseSearchableFields } from './course.constant';
import { TCourse } from './course.interface';
import { Course } from './course.model';

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

const updateCourseIntoDB = async (id: string, payload: Partial<TCourse>) => {
  const { preRequisiteCourses, ...courseRemainingData } = payload;

  // Step -1: Basic course info update
  const updateBasicCourseInfo = await Course.findByIdAndUpdate(
    id,
    courseRemainingData,
    {
      new: true,
      runValidators: true,
    },
  );

  // Check if there is any preRequisiteCourses to update
  if (preRequisiteCourses && preRequisiteCourses.length) {
    const deletedPreRequests = preRequisiteCourses
      ?.filter((ele) => ele.course && ele.isDeleted)
      .map((ele) => ele.course);

    const deletedPreRequestsCourses = await Course?.findByIdAndUpdate(id, {
      $pull: { preRequisiteCourses: { course: { $in: deletedPreRequests } } },
    });

    // Filter out the course field
    const newPreRequisites = preRequisiteCourses?.filter(
      (el) => el.course && !el.isDeleted,
    );

    const newPreRequisitesCourses = await Course.findByIdAndUpdate(id, {
      $addToSet: { preRequisiteCourses: { $each: { newPreRequisites } } },
    });
  }

  const result = await Course.findById(id).populate(
    'preRequisiteCourses.course',
  );

  return result;
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

export const CourseServices = {
  getAllCoursesFromDB,
  getSingleCourseFromDB,
  deleteCourseFromDB,
  createCourseIntoDB,
  updateCourseIntoDB,
};
