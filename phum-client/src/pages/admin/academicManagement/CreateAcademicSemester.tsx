import { Button, Col, Flex } from "antd";
import PHForm from "../../../components/form/PHForm";
import { FieldValues, SubmitErrorHandler } from "react-hook-form";
import PHSelect from "../../../components/form/PHSelect";
import { semesterOptions } from "../../../constants/semester";
import { monthOptions } from "../../../constants/global";
import { zodResolver } from "@hookform/resolvers/zod";
import { academicSemesterSchema } from "../../../schemas/academicManagement.schema";
import { useAddAcademicSemestersMutation } from "../../../redux/features/admin/academicManagement.api";
import { toast } from "sonner";

// Add year functionality this form
const currentYear = new Date().getFullYear();
const yearOptions = [0, 1, 2, 3, 4].map((number) => ({
  value: String(currentYear + number),
  label: String(currentYear + number),
}));

const CreateAcademicSemester = () => {
  const [addAcademicSemester] = useAddAcademicSemestersMutation();

  const onSubmit: SubmitErrorHandler<FieldValues> = async (data) => {
    const name = semesterOptions[Number(data?.name) - 1]?.label;

    const semesterData = {
      name,
      code: data.name,
      year: data.year,
      startMonth: data.startMonth,
      endMonth: data.endMonth,
    };

    try {
      const res = await addAcademicSemester(semesterData);
      console.log("result", res);
    } catch {
      toast.error("Something went wrong"!);
    }
  };

  return (
    <>
      <Flex justify="center" align="center">
        <Col span={8}>
          <PHForm
            onSubmit={onSubmit}
            resolver={zodResolver(academicSemesterSchema)}
          >
            <PHSelect
              defaultValue="Select Semester"
              label="Select Semester"
              name="name"
              options={semesterOptions}
            />
            <PHSelect
              defaultValue="Year"
              label="Year"
              name="year"
              options={yearOptions}
            />
            <PHSelect
              defaultValue="Start Month"
              label="Start Month"
              name="startMonth"
              options={monthOptions}
            />
            <PHSelect
              defaultValue="End Month"
              label="End Month"
              name="endMonth"
              options={monthOptions}
            />

            <Button htmlType="submit">Submit</Button>
          </PHForm>
        </Col>
      </Flex>
    </>
  );
};

export default CreateAcademicSemester;
