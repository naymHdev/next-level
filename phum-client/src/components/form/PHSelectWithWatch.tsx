import { Form, Select } from "antd";
import { useEffect } from "react";
import { Controller, useFormContext, useWatch } from "react-hook-form";

type TSelectProps = {
  name: string;
  label?: string;
  options: { value: string; label: string; disabled?: boolean }[] | undefined;
  defaultValue?: string;
  disabled?: boolean;
  mode?: "multiple" | undefined;
  onValueChange: React.Dispatch<React.SetStateAction<string>>;
};

const PHSelectWithWatch = ({
  label,
  name,
  options,
  defaultValue,
  disabled,
  mode,
  onValueChange,
}: TSelectProps) => {
  const method = useFormContext();
  const inputValue = useWatch({
    control: method.control,
    name,
  });

  useEffect(() => {
    onValueChange(inputValue);
  }, [inputValue, onValueChange]);

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
              disabled={disabled}
              mode={mode}
            />
            {error && <small style={{ color: "red" }}>{error?.message}</small>}
          </Form.Item>
        )}
      />
    </>
  );
};

export default PHSelectWithWatch;
