import { Button, Col, Flex } from "antd";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import PHForm from "../../../components/form/PHForm";
import PHInput from "../../../components/form/PHInput";
import PHSelect from "../../../components/form/PHSelect";
import { useGetAllCoursesQuery } from "../../../redux/features/admin/courseManagement.api";

const CreateCourse = () => {
  const { data: coursesData } = useGetAllCoursesQuery(undefined);

  // Multiple Select options
  const preRequisiteCoursesOptions = coursesData?.data?.map((itm) => ({
    value: itm._id,
    label: itm.title,
  }));

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    toast.loading("Creating...");
    const courseData = {
      ...data,
      isDeleted: false,
      preRequisiteCourses: data?.preRequisiteCourses?.map((itm) => ({
        course: itm,
        isDeleted: false,
      })),
    };

    console.log(courseData);

    // try {
    //   const res = (await addSemester(semesterData)) as TResponse<any>;

    //   console.log("res", res);

    //   if (res.data) {
    //     toast.success(res.data.message, { id: toastId });
    //   } else if (res?.error) {
    //     toast.error(res.error.data.message, { id: toastId });
    //   } else {
    //     toast.error("Something went wrong!", { id: toastId });
    //   }
    // } catch {
    //   toast.error("Something went wrong!", { id: toastId });
    // }
  };

  return (
    <>
      <Flex justify="center" align="center">
        <Col span={8}>
          <PHForm onSubmit={onSubmit}>
            <PHInput type="text" name="title" label="Title" />
            <PHInput type="text" name="prefix" label="Prefix" />
            <PHInput type="text" name="code" label="Code" />
            <PHInput type="text" name="credits" label="Credits" />
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
