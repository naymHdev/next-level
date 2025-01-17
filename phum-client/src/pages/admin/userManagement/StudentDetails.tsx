import { useParams } from "react-router-dom";
import { useGetAllStudentDataQuery } from "../../../redux/features/admin/userManagement.api";
import { Descriptions, Card, Typography, Space, Spin, Alert } from "antd";

const { Title } = Typography;

const StudentDetails = () => {
  const { studentId } = useParams();

  const { data, isLoading, error } = useGetAllStudentDataQuery(undefined);

  // Find the specific student by ID
  const studentData = data?.data?.find((itm) => itm._id === studentId);

  if (isLoading) {
    return (
      <Space
        size="middle"
        style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}
      >
        <Spin size="large" />
      </Space>
    );
  }

  if (error) {
    return (
      <Alert
        message="Error"
        description="There was an error fetching the student details."
        type="error"
        showIcon
      />
    );
  }

  if (!studentData) {
    return (
      <Alert
        message="Not Found"
        description="The student details could not be found."
        type="warning"
        showIcon
      />
    );
  }

  const {
    fullName,
    email,
    contactNo,
    dateOfBirth,
    gender,
    permanentAddress,
    presentAddress,
    bloogGroup,
    guardian,
    localGuardian,
    academicDepartment,
    academicFaculty,
    admissionSemester,
  } = studentData;

  return (
    <Card>
      <Title level={3}>Full Details of {fullName}</Title>
      <Descriptions bordered size="middle" column={1}>
        <Descriptions.Item label="Full Name">
          {`${studentData?.name?.firstName || ""} ${
            studentData?.name?.middleName || ""
          } ${studentData?.name?.lastName || ""}`.trim()}
        </Descriptions.Item>

        <Descriptions.Item label="Email">{email}</Descriptions.Item>
        <Descriptions.Item label="Contact Number">
          {contactNo}
        </Descriptions.Item>
        <Descriptions.Item label="Date of Birth">
          {new Date(dateOfBirth).toLocaleDateString()}
        </Descriptions.Item>
        <Descriptions.Item label="Gender">{gender}</Descriptions.Item>
        <Descriptions.Item label="Blood Group">{bloogGroup}</Descriptions.Item>
        <Descriptions.Item label="Permanent Address">
          {permanentAddress}
        </Descriptions.Item>
        <Descriptions.Item label="Present Address">
          {presentAddress}
        </Descriptions.Item>

        <Descriptions.Item label="Guardian">
          <p>
            Father: {guardian.fatherName} ({guardian.fatherOccupation}) -{" "}
            {guardian.fatherContactNo}
          </p>
          <p>
            Mother: {guardian.motherName} ({guardian.motherOccupation}) -{" "}
            {guardian.motherContactNo}
          </p>
        </Descriptions.Item>

        <Descriptions.Item label="Local Guardian">
          <p>Name: {localGuardian.name}</p>
          <p>Occupation: {localGuardian.occupation}</p>
          <p>Contact: {localGuardian.contactNo}</p>
          <p>Address: {localGuardian.address}</p>
        </Descriptions.Item>

        <Descriptions.Item label="Academic Department">
          {academicDepartment.name}
        </Descriptions.Item>
        <Descriptions.Item label="Academic Faculty">
          {academicFaculty.name}
        </Descriptions.Item>
        <Descriptions.Item label="Admission Semester">
          {admissionSemester.name} {admissionSemester.year} (
          {admissionSemester.startMonth} - {admissionSemester.endMonth})
        </Descriptions.Item>
      </Descriptions>
    </Card>
  );
};

export default StudentDetails;
