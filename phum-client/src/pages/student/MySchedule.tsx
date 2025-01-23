import { useGetallEnrolledCoursesQuery } from "../../redux/features/student/studentCourseManagement.api";
import { Table } from "antd";

const MySchedule = () => {
  const { data: enrolledCoursesData } = useGetallEnrolledCoursesQuery(undefined);
  console.log("enrolledCoursesData", enrolledCoursesData);

  const columns = [
    {
      title: "Course Title",
      dataIndex: ["course", "title"],
      key: "title",
    },
    {
      title: "Course Code",
      dataIndex: ["course", "code"],
      key: "code",
    },
    {
      title: "Credits",
      dataIndex: ["course", "credits"],
      key: "credits",
    },
    {
      title: "Faculty",
      dataIndex: ["faculty", "fullName"],
      key: "faculty",
    },
    {
      title: "Days",
      dataIndex: "days",
      key: "days",
      render: (days) => days?.join(", "),
    },
    {
      title: "Time",
      dataIndex: "startTime",
      key: "time",
      render: (text, record) => `${record.startTime} - ${record.endTime}`,
    },
    {
      title: "Section",
      dataIndex: "section",
      key: "section",
    },
    {
      title: "Max Capacity",
      dataIndex: "maxCapacity",
      key: "maxCapacity",
    },
  ];

  return (
    <div>
      <h2>My Schedule</h2>
      <Table
        dataSource={enrolledCoursesData?.data || []}
        columns={columns}
        rowKey="_id"
        pagination={false}
      />
    </div>
  );
};

export default MySchedule;
