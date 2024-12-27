import { UserService } from './user.service';
import { sendResponse } from '../../utils/sendResponse';
import { StatusCodes } from 'http-status-codes';
import { catchAsync } from '../../utils/catchAsync';

const createStudent = catchAsync(async (req, res) => {
  const { password, student: studentData } = req.body;

  const result = await UserService.createStudentIntoDB(
    req.file,
    password,
    studentData,
  );
  sendResponse(res, {
    success: true,
    message: 'Student is created successfully',
    statusCode: StatusCodes.OK,
    data: result,
  });
});

const createFaculty = catchAsync(async (req, res) => {

  console.log('faculty', req.user);

  const { password, faculty: facultyData } = req.body;

  const result = await UserService.createFacultyIntoDB(password, facultyData);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Faculty is created succesfully',
    data: result,
  });
});

const createAdmin = catchAsync(async (req, res) => {
  const { password, admin: adminData } = req.body;

  const result = await UserService.createAdminIntoDB(password, adminData);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Admin is created succesfully',
    data: result,
  });
});

const getMyData = catchAsync(async (req, res) => {
  const { userId, role } = req.user;
  const result = await UserService.getMyDataFromDB(userId, role);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Retrieve my data successfully',
    data: result,
  });
});

const changeStatus = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await UserService.changeStatusFromDB(id, req.body);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Status change successfully',
    data: result,
  });
});

export const UserController = {
  createStudent,
  createFaculty,
  createAdmin,
  getMyData,
  changeStatus,
};
