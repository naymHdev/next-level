import { Button, Dropdown, Table, Tag } from "antd";
import type { TableColumnsType } from "antd";
import {
  useGetAllRegisteredSemestersQuery,
  useUpdateRegisteredSemesterMutation,
} from "../../../redux/features/admin/courseManagement.api";
import { TSemester } from "../../../types/courseManagement.type";
import moment from "moment";
import { useState } from "react";
import { toast } from "sonner";
import { TResponse } from "../../../types";

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
  const [updateSemesterStatus] = useUpdateRegisteredSemesterMutation();
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

  const handleStatusUpdate = async (data: any) => {
    const toastId = toast.loading("Updating...");
    const updateData = {
      id: semesterId,
      data: {
        status: data.key,
      },
    };

    try {
      const res = (await updateSemesterStatus(updateData)) as TResponse<any>;
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
