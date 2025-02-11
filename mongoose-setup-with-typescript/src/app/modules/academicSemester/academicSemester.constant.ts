import {
  TAcademicSemesterCodes,
  TAcademicSemesterNameCodeMapper,
  TAcademicSemesterNames,
  TMonth,
} from './academicSemester.interface';

export const Months: TMonth[] = [
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

export const AcademicSemesterNames: TAcademicSemesterNames[] = [
  'Autumn',
  'Summer',
  'Fall',
];
export const AcademicSemesterCodes: TAcademicSemesterCodes[] = [
  '01',
  '02',
  '03',
];

// Academic semester creation time checking a duplicate code or semester name!
export const AcademicSemesterNameCodeMapper: TAcademicSemesterNameCodeMapper = {
  Autumn: '01',
  Summer: '02',
  Fall: '03',
};
