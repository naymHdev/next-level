import { Button, Col, Result, Row, Spin } from "antd";
import {
  useEnrollCourseMutation,
  useGetallOfferedCoursesQuery,
} from "../../redux/features/student/studentCourseManagement.api";
import { toast } from "sonner";
import { TResponse } from "../../types";

type TCourse = {
  [index: string]: any;
};

const OfferedCourse = () => {
  const {
    data: offeredCoursesData,
    isLoading,
    isFetching,
  } = useGetallOfferedCoursesQuery(undefined);
  const [enroll] = useEnrollCourseMutation();

  const singleObject = offeredCoursesData?.data?.reduce(
    (acc: TCourse, item) => {
      const key = item.course.title;

      acc[key] = acc[key] || { courseTitle: key, sections: [] };

      acc[key]?.sections.push({
        section: item.section,
        _id: item._id,
        days: item.days,
        startTime: item.startTime,
        endTime: item.endTime,
      });
      return acc;
    },
    {}
  );

  const modifiedData = Object.values(singleObject ? singleObject : {});

  const handleEnroll = async (id: string) => {
    const toastId = toast.loading("Enrolling...");

    const enrollData = {
      offeredCourse: id,
    };

    try {
      const res = (await enroll(enrollData)) as TResponse<any>;
      console.log("enroll res", res);
      if (res.data?.success == true) {
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

  if (isLoading && isFetching) {
    return (
      <>
        <Spin size="large" />
      </>
    );
  }

  if (!modifiedData.length) {
    return (
      <>
        <Result status="warning" title="No available courses!" />
      </>
    );
  }

  return (
    <>
      <Row gutter={[0, 20]}>
        {modifiedData?.map((item) => {
          return (
            <Col span={24} style={{ border: "solid #d4d4d4 2px" }}>
              <div style={{ padding: "10px" }}>
                <h2>{item.courseTitle}</h2>
              </div>
              <div>
                {item?.sections?.map((section) => {
                  return (
                    <Row
                      justify="space-between"
                      align="middle"
                      style={{
                        borderTop: "solid #d4d4d4 2px",
                        padding: "10px",
                      }}
                    >
                      <Col span={5}>Section: {section.section} </Col>
                      <Col span={5}>
                        days:
                        {section?.days?.map((day) => (
                          <span> {day} </span>
                        ))}
                      </Col>
                      <Col span={5}>Start Time: {section.startTime} </Col>
                      <Col span={5}>End Time: {section.endTime} </Col>
                      <Button onClick={() => handleEnroll(section._id)}>
                        Enroll
                      </Button>
                    </Row>
                  );
                })}
              </div>
            </Col>
          );
        })}
      </Row>
    </>
  );
};

export default OfferedCourse;
