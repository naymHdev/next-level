import { StatusCodes } from 'http-status-codes';
import AppError from '../../errors/appError';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import { TSemesterRegistration } from './semesterRegistration.interface';
import { SemesterRegistration } from './semesterRegistration.model';
import QueryBuilder from '../../builder/QueryBuilder';
import { RegistrationStatus } from './semesterRegistration.constant';

const createSemesterRegistrationIntoDB = async (
  payload: TSemesterRegistration,
) => {
  const academicSemester = payload?.academicSemester;

  // Checking if there any registered semesters that is already "ongoing" or "upcoming"
  const isSemesterRegistrationOngoing = await SemesterRegistration.findOne({
    $or: [
      {
        status: RegistrationStatus.ONGOING,
      },
      {
        status: RegistrationStatus.UPCOMING,
      },
    ],
  });

  if (isSemesterRegistrationOngoing) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      `there is already a ${isSemesterRegistrationOngoing.status} registration`,
    );
  }

  // Checking if the semester is exist or no exist?
  const isAcademicSemesterIsExists =
    await AcademicSemester.findById(academicSemester);

  if (!isAcademicSemesterIsExists) {
    throw new AppError(
      StatusCodes.NOT_FOUND,
      'Academic Semester is not found.',
    );
  }

  // Check already semester registered!
  const isSemesterRegistrationExists = await SemesterRegistration.findOne({
    academicSemester,
  });

  if (isSemesterRegistrationExists) {
    throw new AppError(
      StatusCodes.CONFLICT,
      'Its semester already registered!',
    );
  }

  const result = await SemesterRegistration.create(payload);
  return result;
};

const getAllSemesterRegistrationFromDB = async (
  query: Record<string, unknown>,
) => {
  const semesterRegistrationQuery = new QueryBuilder(
    SemesterRegistration.find().populate('academicSemester'),
    query,
  )
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await semesterRegistrationQuery.modelQuery;
  return result;
};

const getSingleSemesterRegistrationFromDB = async (id: string) => {
  const result = await SemesterRegistration.findById(id);
  return result;
};

const updateSemesterRegistrationIntoDB = async (
  id: string,
  payload: Partial<TSemesterRegistration>,
) => {
  // Checking if the semester is exist or no exist?
  const isSemesterRegistrationsIsExists =
    await SemesterRegistration.findById(id);

  if (!isSemesterRegistrationsIsExists) {
    throw new AppError(StatusCodes.NOT_FOUND, 'The Semester is not found.');
  }

  // if semester already complete then we can't update it
  const currentSemesterStatus = isSemesterRegistrationsIsExists?.status;
  const requestedStatus = payload?.status;

  if (currentSemesterStatus === RegistrationStatus.ENDED) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      `Semester is already ${currentSemesterStatus}`,
    );
  }

  // 'UPCOMING' -- > 'ONGOING' --> 'ENDED'
  if (
    currentSemesterStatus === RegistrationStatus.UPCOMING &&
    requestedStatus === RegistrationStatus.ENDED
  ) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      `You can't update ${currentSemesterStatus} to ${requestedStatus}`,
    );
  }

  if (
    currentSemesterStatus === RegistrationStatus.ONGOING &&
    requestedStatus === RegistrationStatus.UPCOMING
  ) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      `You can't update ${currentSemesterStatus} to ${requestedStatus}`,
    );
  }

  const result = await SemesterRegistration.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  return result;
};

const deleteSemesterRegistrationIntoDB = async () => {};

export const SemesterRegistrationService = {
  createSemesterRegistrationIntoDB,
  getAllSemesterRegistrationFromDB,
  getSingleSemesterRegistrationFromDB,
  updateSemesterRegistrationIntoDB,
  deleteSemesterRegistrationIntoDB,
};
