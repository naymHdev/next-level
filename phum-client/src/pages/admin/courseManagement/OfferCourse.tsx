import { Button, Col, Flex } from "antd";
import PHForm from "../../../components/form/PHForm";
import PHSelect from "../../../components/form/PHSelect";
import PHDatePicker from "../../../components/form/PHDatePicker";
import PHInput from "../../../components/form/PHInput";
import { FieldValues, SubmitHandler } from "react-hook-form";
import {
  useGetAllAcademicDepartmentQuery,
  useGetAllAcademicFacultyQuery,
} from "../../../redux/features/admin/academicManagement.api";

const OfferCourse = () => {
  const { data: academicFaculty } = useGetAllAcademicFacultyQuery(undefined);
  const { data: academicDepartment } =
    useGetAllAcademicDepartmentQuery(undefined);

  //  Input Selects Options
  const academicFacultyOptions = academicFaculty?.data?.map((itm) => ({
    value: itm._id,
    label: itm.name,
  }));

  const academicDepartmentOptions = academicDepartment?.data?.map((itm) => ({
    value: itm._id,
    label: itm.name,
  }));

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log(data);
  };

  return (
    <>
      <Flex justify="center" align="center">
        <Col span={8}>
          <PHForm onSubmit={onSubmit}>
            <PHSelect
              options={academicFacultyOptions}
              label="Academic Faculty"
              name="academicFaculty"
            />
            <PHSelect
              options={academicDepartmentOptions}
              label="Academic Department"
              name="academicDepartment"
            />
            <PHDatePicker name="startDate" label="Start Date" />
            <PHInput type="text" name="test" label="Test" />

            <Button htmlType="submit">Submit</Button>
          </PHForm>
        </Col>
      </Flex>
    </>
  );
};

export default OfferCourse;
