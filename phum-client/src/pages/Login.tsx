import { Button } from "antd";
import { useForm } from "react-hook-form";
import { useLoginMutation } from "../redux/features/auth/authApi";
import { useAppDispatch } from "../redux/hooks";
import { setUser } from "../redux/features/auth/authSlice";
import { verifyToken } from "../utils/verifyToken";

const Login = () => {
  const dispatch = useAppDispatch();

  const { register, handleSubmit } = useForm({
    defaultValues: {
      id: "SA-0001",
      password: "admin12345",
    },
  });

  const [login, { error }] = useLoginMutation();

  const onsubmit = async (data) => {
    const userInfo = {
      id: data.id,
      password: data.password,
    };
    const res = await login(userInfo).unwrap();

    const user = verifyToken(res?.data.accessToken);

    dispatch(setUser({ user: user, token: res.data.accessToken }));

    console.log("loginForm", res);
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
