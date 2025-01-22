import { Button, Col, Flex } from "antd";
import PHForm from "../../../components/form/PHForm";
import PHSelect from "../../../components/form/PHSelect";
import PHInput from "../../../components/form/PHInput";
import { FieldValues, SubmitHandler } from "react-hook-form";
import {
  useGetAllAcademicDepartmentQuery,
  useGetAllAcademicFacultyQuery,
} from "../../../redux/features/admin/academicManagement.api";
import PHSelectWithWatch from "../../../components/form/PHSelectWithWatch";
import { useState } from "react";
import PHTimePicker from "../../../components/form/PHTimePicker";
import { weekDaysOptions } from "../../../constants/global";
import {
  useCreateOfferedCourseMutation,
  useGetAllCoursesQuery,
  useGetAllRegisteredSemestersQuery,
  useGetCourseFacultiesQuery,
} from "../../../redux/features/admin/courseManagement.api";
import moment from "moment";
import { toast } from "sonner";
import { TResponse } from "../../../types";

const OfferCourse = () => {
  const [courseId, setCourseId] = useState("");

  const [addOfferedCourse] = useCreateOfferedCourseMutation();

  const { data: academicFaculty, isFetching: fetchingFaculties } =
    useGetAllAcademicFacultyQuery(undefined);

  const { data: academicDepartment } =
    useGetAllAcademicDepartmentQuery(undefined);

  const { data: semesterRegistration } = useGetAllRegisteredSemestersQuery([
    { name: "sort", value: "year" },
    { name: "status", value: "UPCOMING" },
  ]);

  const { data: coursesData } = useGetAllCoursesQuery(undefined);

  const { data: facultiesData } = useGetCourseFacultiesQuery(courseId, {
    skip: !courseId,
  });

  //  Input Selects Options
  const courseOptions = coursesData?.data?.map((item) => ({
    value: item._id,
    label: item.title,
  }));

  const facultiesOptions = facultiesData?.data?.faculties?.map((item) => ({
    value: item._id,
    label: item.fullName,
  }));

  const semesterRegistrationOptions = semesterRegistration?.data?.map(
    (item) => ({
      value: item._id,
      label: `${item.academicSemester.name} ${item.academicSemester.year}`,
    })
  );

  const academicFacultyOptions = academicFaculty?.data?.map((itm) => ({
    value: itm._id,
    label: itm.name,
  }));

  const academicDepartmentOptions = academicDepartment?.data?.map((itm) => ({
    value: itm._id,
    label: itm.name,
  }));

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Creating...");
    const offeredCourseData = {
      ...data,
      maxCapacity: Number(data.maxCapacity),
      section: Number(data.section),
      startTime: moment(new Date(data.startTime)).format("HH:mm"),
      endTime: moment(new Date(data.endTime)).format("HH:mm"),
    };

    try {
      const res = (await addOfferedCourse(offeredCourseData)) as TResponse<any>;
      console.log("offer", res);
      if (res.data) {
        toast.success(res.data.message, { id: toastId });
      } else if (res?.error) {
        toast.error(res.error.data.message, { id: toastId });
      } else {
        toast.error("Something went wrong!", { id: toastId });
      }
    } catch {
      toast.error("Something went wrong!", { id: toastId });
    }
  };

  return (
    <>
      <Flex justify="center" align="center">
        <Col span={6}>
          <PHForm onSubmit={onSubmit}>
            <PHSelect
              name="semesterRegistration"
              label="Semester Registrations"
              options={semesterRegistrationOptions}
            />
            <PHSelect
              name="academicFaculty"
              label="Academic Faculty"
              options={academicFacultyOptions}
            />
            <PHSelect
              name="academicDepartment"
              label="Academic Department"
              options={academicDepartmentOptions}
            />
            <PHSelectWithWatch
              onValueChange={setCourseId}
              options={courseOptions}
              name="course"
              label="Course"
            />
            <PHSelect
              disabled={!courseId || fetchingFaculties}
              name="faculty"
              label="Faculty"
              options={facultiesOptions}
            />
            <PHInput type="text" name="section" label="Section" />
            <PHInput type="text" name="maxCapacity" label="Max Capacity" />
            <PHSelect
              mode="multiple"
              options={weekDaysOptions}
              name="days"
              label="Days"
            />
            <PHTimePicker name="startTime" label="Start Time" />
            <PHTimePicker name="endTime" label="End Time" />

            <Button htmlType="submit">Submit</Button>
          </PHForm>
        </Col>
      </Flex>
    </>
  );
};

export default OfferCourse;
