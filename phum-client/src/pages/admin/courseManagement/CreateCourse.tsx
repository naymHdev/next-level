import { Button, Col, Flex } from "antd";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import PHForm from "../../../components/form/PHForm";
import PHInput from "../../../components/form/PHInput";
import PHSelect from "../../../components/form/PHSelect";
import {
  useAddCourseMutation,
  useGetAllCoursesQuery,
} from "../../../redux/features/admin/courseManagement.api";
import { TResponse } from "../../../types";

const CreateCourse = () => {
  const { data: coursesData } = useGetAllCoursesQuery(undefined);
  const [createCourse] = useAddCourseMutation();

  // Multiple Select options
  const preRequisiteCoursesOptions = coursesData?.data?.map((itm) => ({
    value: itm._id,
    label: itm.title,
  }));

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Creating...");
    const courseData = {
      ...data,
      code: Number(data.code),
      credits: Number(data.credits),
      isDeleted: false,
      preRequisiteCourses: data?.preRequisiteCourses?.map((itm) => ({
        course: itm,
        isDeleted: false,
      })),
    };

    try {
      const res = (await createCourse(courseData)) as TResponse<any>;

      console.log("res", res);

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
        <Col span={8}>
          <PHForm onSubmit={onSubmit}>
            <PHInput type="text" name="title" label="Title" />
            <PHInput type="text" name="prefix" label="Prefix" />
            <PHInput type="number" name="code" label="Code" />
            <PHInput type="number" name="credits" label="Credits" />
            <PHSelect
              options={preRequisiteCoursesOptions}
              mode="multiple"
              name="preRequisiteCourses"
              label="Pre Requisite Courses"
            />

            <Button htmlType="submit">Submit</Button>
          </PHForm>
        </Col>
      </Flex>
    </>
  );
};

export default CreateCourse;
