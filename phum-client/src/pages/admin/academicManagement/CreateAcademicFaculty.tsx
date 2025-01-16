import { Button, Col, Flex } from "antd";
import PHForm from "../../../components/form/PHForm";
import PHInput from "../../../components/form/PHInput";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { FieldValues, SubmitErrorHandler } from "react-hook-form";
import { useAddAcademicFacultyMutation } from "../../../redux/features/admin/academicFaculty.api";
import { toast } from "sonner";
import { TResponse } from "../../../types";

const academicFacultySchema = z.object({
  name: z.string({ required_error: "Place create a faculty name!" }),
});

const CreateAcademicFaculty = () => {
  const [addAcademicFaculty] = useAddAcademicFacultyMutation();

  const onSubmit: SubmitErrorHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Loading...");

    const academicFacultyData = {
      name: data.name,
    };

    try {
      const res = (await addAcademicFaculty(academicFacultyData)) as TResponse;
      if (res?.data) {
        toast.error(res.data.message, { id: toastId });
      }

      if (res?.error) {
        toast.error(res.error.data.message, { id: toastId });
      }
    } catch {
      toast.error("Something went wrong!", { id: toastId });
    }
  };

  return (
    <>
      <Flex justify="center" align="center">
        <Col span={8}>
          <PHForm
            onSubmit={onSubmit}
            resolver={zodResolver(academicFacultySchema)}
          >
            <PHInput type="text" name="name" label="Academic Faculty Name" />
            <Button htmlType="submit">Submit</Button>
          </PHForm>
        </Col>
      </Flex>
    </>
  );
};

export default CreateAcademicFaculty;
