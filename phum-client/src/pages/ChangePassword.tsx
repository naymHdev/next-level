import { Button, Row } from "antd";
import PHForm from "../components/form/PHForm";
import PHInput from "../components/form/PHInput";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { useChangePasswordMutation } from "../redux/features/admin/userManagement.api";
import { toast } from "sonner";
import { useAppDispatch } from "../redux/hooks";
import { logout } from "../redux/features/auth/authSlice";
import { useNavigate } from "react-router-dom";

const ChangePassword = () => {
  const dispatch = useAppDispatch();
  const [changePassword] = useChangePasswordMutation();

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Changing password");

    try {
      const res = await changePassword(data);
      if (res.data?.success == true) {
        toast.success(res.data.message, { id: toastId });
        dispatch(logout());
        navigate("/login");
      } else if (res?.error) {
        toast.error(res.error.data.message, { id: toastId });
      } else {
        toast.error("Something went wrong", { id: toastId });
      }
    } catch {
      toast.error("Something went wrong ", { id: toastId });
    }
  };

  return (
    <>
      <Row justify="center" align="middle" style={{ height: "100vh" }}>
        <PHForm onSubmit={onSubmit}>
          <PHInput
            type="text"
            name="oldPassword"
            label="Enter your old password"
          />
          <PHInput
            type="text"
            name="newPassword"
            label="Enter your new password"
          />
          <Button htmlType="submit">Update</Button>
        </PHForm>
      </Row>
    </>
  );
};

export default ChangePassword;
