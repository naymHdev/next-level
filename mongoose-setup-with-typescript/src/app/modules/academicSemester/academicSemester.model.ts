import { model, Schema } from 'mongoose';
import {
  TAcademicSemester,
  TAcademicSemesterCodes,
  TAcademicSemesterNames,
  TMonth,
} from './academicSemester.interface';

const Months: TMonth[] = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const AcademicSemesterNames: TAcademicSemesterNames[] = [
  'Autumn',
  'Summer',
  'Fall',
];
const AcademicSemesterCodes: TAcademicSemesterCodes[] = ['01', '02', '03'];

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
    type: Date,
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

export const AcademicSemester = model<TAcademicSemester>(
  'AcademicSemester',
  academicSemesterSchema,
);
