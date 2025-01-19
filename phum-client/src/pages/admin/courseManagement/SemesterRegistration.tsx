import { Button, Col, Flex } from "antd";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import PHForm from "../../../components/form/PHForm";
import PHSelect from "../../../components/form/PHSelect";
import { useGetAllSemestersQuery } from "../../../redux/features/admin/academicManagement.api";
import PHDatePicker from "../../../components/form/PHDatePicker";
import { semesterStatusOptions } from "../../../constants/semester";
import PHInput from "../../../components/form/PHInput";
import { useAddRegisteredSemesterMutation } from "../../../redux/features/admin/courseManagement.api";
import { TResponse } from "../../../types";

const SemesterRegistration = () => {
  const [addSemester] = useAddRegisteredSemesterMutation();
  const { data: academicSemesterData } = useGetAllSemestersQuery([
    { name: "sort", value: "year" },
  ]);

  const academicSemesterOptions = academicSemesterData?.data?.map((itm) => ({
    value: itm._id,
    label: `${itm.name}-${itm.year}`,
  }));

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Creating...");

    const semesterData = {
      ...data,
      //   academicSemester: data.academicSemester,
      //   status: data.status,
      //   startDate: data.startDate,
      //   endDate: data.endDate,
      minCredit: Number(data.minCredit),
      maxCredit: Number(data.maxCredit),
    };

    try {
      const res = (await addSemester(semesterData)) as TResponse<any>;

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
            <PHSelect
              defaultValue="Select Semester"
              label="Select Semester"
              name="academicSemester"
              options={academicSemesterOptions}
            />
            <PHSelect
              defaultValue="Status"
              label="Status"
              name="status"
              options={semesterStatusOptions}
            />
            <PHDatePicker name="startDate" label="Start Date" />
            <PHDatePicker name="endDate" label="End Date" />
            <PHInput type="number" name="minCredit" label="Min Credit" />
            <PHInput type="number" name="maxCredit" label="Max Credit" />

            <Button htmlType="submit">Submit</Button>
          </PHForm>
        </Col>
      </Flex>
    </>
  );
};

export default SemesterRegistration;
