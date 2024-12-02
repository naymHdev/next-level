import { model, Schema } from 'mongoose';
import { TAcademicSemester } from './academicSemester.interface';
import {
  AcademicSemesterCodes,
  AcademicSemesterNames,
  Months,
} from './academicSemester.constant';

const academicSemesterSchema = new Schema<TAcademicSemester>({
  name: {
    type: String,
    required: true,
    enum: AcademicSemesterNames,
  },
  code: {
    type: String,
    required: true,
    enum: AcademicSemesterCodes,
  },
  year: {
    type: String,
    required: true,
  },
  startMonth: {
    type: String,
    enum: Months,
    required: true,
  },
  endMonth: {
    type: String,
    enum: Months,
    required: true,
  },
});

academicSemesterSchema.pre('save', async function (next) {
  const isSemesterExist = await AcademicSemester.findOne({
    year: this.year,
    name: this.name,
  });

  if (isSemesterExist) {
    throw new Error('Semester already exist in year');
  }
  next();
});

export const AcademicSemester = model<TAcademicSemester>(
  'AcademicSemester',
  academicSemesterSchema,
);
