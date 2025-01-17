import { DatePicker, Form } from "antd";
import { Controller } from "react-hook-form";

type TDatePickerProps = {
  name: string;
  label?: string;
};

const PHDatePicker = ({ name, label }: TDatePickerProps) => {
  return (
    <>
      <div>
        <Controller
          name={name}
          render={({ field, fieldState: { error } }) => (
            <Form.Item label={label}>
              <DatePicker {...field} size="large" style={{ width: "100%" }} />
              {error && (
                <small style={{ color: "red" }}>{error?.message}</small>
              )}
            </Form.Item>
          )}
        />
      </div>
    </>
  );
};

export default PHDatePicker;
