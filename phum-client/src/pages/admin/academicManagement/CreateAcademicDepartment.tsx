import { Button, Col, Flex } from "antd";
import PHForm from "../../../components/form/PHForm";
import PHInput from "../../../components/form/PHInput";
import { FieldValues, SubmitHandler } from "react-hook-form";
import PHSelect from "../../../components/form/PHSelect";
import {
  useAddAcademicDepartmentMutation,
  useGetAllAcademicFacultyQuery,
} from "../../../redux/features/admin/academicManagement.api";
import { toast } from "sonner";
import { TResponse } from "../../../types";

interface IFacultyData {
  _id: string;
  name: string;
}

const CreateAcademicDepartment = () => {
  const { data: academicFacultyData } =
    useGetAllAcademicFacultyQuery(undefined);

  const [academicDepartment] = useAddAcademicDepartmentMutation();

  const facultyOptions = academicFacultyData?.data?.map(
    (itm: IFacultyData) => ({
      value: itm._id,
      label: itm.name,
    })
  );

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Creating...");

    const departmentData = {
      name: data?.name,
      academicFaculty: data?.academicFaculty,
    };

    try {
      const res = (await academicDepartment(departmentData)) as TResponse<any>;

      if (res.data) {
        toast.success(res.data.message, { id: toastId });
      } else if (res?.error) {
        toast.error(res.error.data.message, { id: toastId });
      } else {
        toast.error("Something went wrong", { id: toastId });
      }
    } catch {
      toast.error("Something went wrong", { id: toastId });
    }
  };

  return (
    <>
      <Flex justify="center" align="center">
        <Col span={8}>
          <PHForm onSubmit={onSubmit}>
            <PHInput type="text" name="name" label="Department Name" />
            <PHSelect
              defaultValue="Select Faculty"
              label="Academic Faculties"
              name="academicFaculty"
              options={facultyOptions}
            />
            <Button htmlType="submit">Submit</Button>
          </PHForm>
        </Col>
      </Flex>
    </>
  );
};

export default CreateAcademicDepartment;
