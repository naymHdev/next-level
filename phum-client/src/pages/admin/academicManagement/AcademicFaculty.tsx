import { Table, TableColumnsType, TableProps } from "antd";
import { useGetAllAcademicFacultyQuery } from "../../../redux/features/admin/academicFaculty.api";
import { TQueryParam } from "../../../types";
import { useState } from "react";
import { TAcademicFaculty } from "../../../types/academicFaculty.type";

export type TTableData = Pick<TAcademicFaculty, "name" | "_id">;

const AcademicFaculty = () => {
  const [params, setParams] = useState<TQueryParam[] | undefined>(undefined);

  const { data: academicFacultyData, isFetching } =
    useGetAllAcademicFacultyQuery(params);

  const tableData = academicFacultyData?.data?.map(
    ({ _id, name }: TTableData) => ({
      key: _id,
      name,
    })
  );

  const columns: TableColumnsType<TTableData> = [
    {
      title: "Academic Faculty Name",
      dataIndex: "name",
      showSorterTooltip: { target: "full-header" },

      // specify the condition of filtering result
      // here is that finding the name started with `value`
      onFilter: (value, record) => record.name.indexOf(value as string) === 0,
      sorter: (a, b) => a.name.length - b.name.length,
      sortDirections: ["descend"],
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

export default AcademicFaculty;
