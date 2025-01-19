import { Button, Dropdown, Table, Tag } from "antd";
import type { TableColumnsType } from "antd";
import { useGetAllRegisteredSemestersQuery } from "../../../redux/features/admin/courseManagement.api";
import { TSemester } from "../../../types/courseManagement.type";
import moment from "moment";
import { useState } from "react";

const items = [
  {
    label: "Upcoming",
    key: "UPCOMING",
  },
  {
    label: "Ongoing",
    key: "ONGOING",
  },
  {
    label: "Ended",
    key: "ENDED",
  },
];

export type TTableData = Pick<TSemester, "startDate" | "endDate" | "status">;

const RegisteredSemester = () => {
  const [semesterId, setSemesterId] = useState("");

  const { data: registerSemesterData, isFetching } =
    useGetAllRegisteredSemestersQuery(undefined);

  const tableData = registerSemesterData?.data?.map(
    ({ _id, startDate, endDate, status, academicSemester }) => ({
      key: _id,
      name: `${academicSemester?.name} ${academicSemester?.year}`,
      startDate: moment(new Date(startDate)).format("Do MMM"),
      endDate: moment(new Date(endDate)).format("Do MMM"),
      status,
    })
  );

  const handleStatusUpdate = (data: any) => {
    const updateData = {
      id: semesterId,
      data: {
        status: data.key,
      },
    };
    // updateSemesterStatus(updateData);
    console.log("updateData", updateData);
  };

  const menuProps = {
    items,
    onClick: handleStatusUpdate,
  };

  const columns: TableColumnsType<TTableData> = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (item) => {
        let color;
        if (item === "UPCOMING") {
          color = "blue";
        }
        if (item === "ONGOING") {
          color = "green";
        }
        if (item === "ENDED") {
          color = "red";
        }

        return <Tag color={color}>{item}</Tag>;
      },
    },
    {
      title: "Start Date",
      dataIndex: "startDate",
    },
    {
      title: "End Date",
      dataIndex: "endDate",
    },
    {
      title: "Action",
      key: "x",
      render: (item) => {
        return (
          <Dropdown menu={menuProps} trigger={["click"]}>
            <Button onClick={() => setSemesterId(item.key)}>Update</Button>
          </Dropdown>
        );
      },
    },
  ];

  //   const onChange: TableProps<TTableData>["onChange"] = (
  //     _pagination,
  //     filters,
  //     _sorter,
  //     extra
  //   ) => {
  //     if (extra.action === "filter") {
  //       const queryParams: TQueryParam[] = [];
  //       filters.name?.forEach((item) =>
  //         queryParams.push({ name: "name", value: item })
  //       );
  //       setParams(queryParams);
  //     }
  //   };

  return (
    <>
      <Table<TTableData>
        loading={isFetching}
        columns={columns}
        dataSource={tableData}
        // onChange={onChange}
        showSorterTooltip={{ target: "sorter-icon" }}
      />
    </>
  );
};

export default RegisteredSemester;
