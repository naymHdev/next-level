import { useGetAllSemestersQuery } from "../../../redux/features/admin/academicManagement.api";

const AcademicSemester = () => {
  const { data } = useGetAllSemestersQuery(undefined);

  return (
    <>
      <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
        {data?.data?.map((item) => (
          <div
            key={item._id}
            style={{
              border: "1px solid #ccc",
              borderRadius: "8px",
              padding: "16px",
              maxWidth: "300px",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            }}
          >
            <h2 style={{ margin: "0 0 8px" }}>
              {item.name} ({item.year})
            </h2>
            <p style={{ margin: "0 0 4px" }}>
              <strong>Code:</strong> {item.code}
            </p>
            <p style={{ margin: "0 0 4px" }}>
              <strong>Duration:</strong> {item.startMonth} - {item.endMonth}
            </p>
            <p style={{ margin: "0" }}>
              <strong>Created At:</strong>{" "}
              {new Date(item.createdAt).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>
    </>
  );
};

export default AcademicSemester;
