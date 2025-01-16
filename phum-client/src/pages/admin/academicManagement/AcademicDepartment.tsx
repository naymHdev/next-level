import { Table, TableColumnsType, TableProps } from "antd";
import { useGetAllAcademicDepartmentQuery } from "../../../redux/features/admin/academicManagement.api";
import { TAcademicDepartment } from "../../../types/academicManagement.type";
import { TQueryParam } from "../../../types";
import { useState } from "react";

export type TTableData = Pick<TAcademicDepartment, "name" | "academicFaculty">;

const AcademicDepartment = () => {
  const [params, setParams] = useState<TQueryParam[] | undefined>(undefined);

  const { data: academicDepartmentData, isFetching } =
    useGetAllAcademicDepartmentQuery(params);

  const tableData = academicDepartmentData?.data?.map(
    ({ _id, name, academicFaculty }) => ({
      key: _id,
      name,
      academicFaculty: academicFaculty.name,
    })
  );

  const columns: TableColumnsType<TTableData> = [
    {
      title: "Department Name",
      dataIndex: "name",

      // specify the condition of filtering result
      // here is that finding the name started with `value`
      onFilter: (value, record) => record.name.indexOf(value as string) === 0,
      sorter: (a, b) => a.name.length - b.name.length,
      sortDirections: ["descend"],
    },
    {
      title: "Academic Faculty",
      dataIndex: "academicFaculty",
    },
  ];

  const onChange: TableProps<TTableData>["onChange"] = (
    _pagination,
    filters,
    _sorter,
    extra
  ) => {
    if (extra.action === "filter") {
      const queryParams: TQueryParam[] = [];
      filters.name?.forEach((item) =>
        queryParams.push({ name: "name", value: item })
      );
      setParams(queryParams);
    }
  };

  // console.log("academicDepartmentData", academicDepartmentData);

  return (
    <>
      <Table<TTableData>
        loading={isFetching}
        columns={columns}
        dataSource={tableData}
        onChange={onChange}
        showSorterTooltip={{ target: "sorter-icon" }}
      />
    </>
  );
};

export default AcademicDepartment;
