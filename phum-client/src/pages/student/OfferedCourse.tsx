import { useGetallOfferedCoursesQuery } from "../../redux/features/student/studentCourseManagement.api";

const OfferedCourse = () => {
  const { data: offeredCoursesData } = useGetallOfferedCoursesQuery(undefined);
  console.log("offeredCoursesData", offeredCoursesData?.data);

  return <>OfferedCourse</>;
};

export default OfferedCourse;
