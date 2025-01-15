import { Form, Select } from "antd";
import { Controller } from "react-hook-form";

type TSelectProps = {
  name: string;
  label?: string;
  options: { value: string; label: string; disabled?: boolean }[];
  defaultValue?: string;
};

const PHSelect = ({ label, name, options, defaultValue }: TSelectProps) => {
  return (
    <>
      <Controller
        name={name}
        render={({ field, fieldState: { error } }) => (
          <Form.Item label={label}>
            <Select
              defaultValue={defaultValue}
              {...field}
              style={{ width: "100%" }}
              options={options}
              size="large"
            />
            {error && <small style={{ color: "red" }}>{error?.message}</small>}
          </Form.Item>
        )}
      />
    </>
  );
};

export default PHSelect;
