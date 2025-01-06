import { Button } from "@/components/ui/button";
import { removeUser } from "@/redux/features/user/userSlice";
import { useAppDispatch } from "@/redux/hook";
import { IUser } from "@/types/types";
import { Trash2 } from "lucide-react";

interface IProps {
  user: IUser;
}

const UserCard = ({ user }: IProps) => {
  const dispatch = useAppDispatch();

  return (
    <>
      <div className=" border px-5 py-3 rounded-md">
        <div className=" flex justify-between items-center">
          <div className=" flex gap-2 items-center">
            <h1>{user.name}</h1>
          </div>
          <div>
            <Button
              onClick={() => dispatch(removeUser(user?.id))}
              variant="link"
              className=" p-0 text-red-500"
            >
              <Trash2 />
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserCard;
