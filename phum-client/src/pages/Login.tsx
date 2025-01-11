import { Button } from "antd";
import { useForm } from "react-hook-form";
import { useLoginMutation } from "../redux/features/auth/authApi";

const Login = () => {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      id: "SA-0001",
      password: "admin12345",
    },
  });

  const [login, { data, error }] = useLoginMutation();

  console.log("data", data);
  console.log("error", error);

  const onsubmit = (data) => {
    const userInfo = {
      id: data.id,
      password: data.password,
    };
    login(userInfo);

    console.log("loginForm", data);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onsubmit)}>
        <div>
          <div>
            <label htmlFor="id">Id:</label>
            <input type="text" id="id" {...register("id")} />
          </div>
          <div>
            <label htmlFor="text">Password</label>
            <input type="text" id="password" {...register("password")} />
          </div>
        </div>
        <Button htmlType="submit">Login</Button>
      </form>
    </>
  );
};

export default Login;
