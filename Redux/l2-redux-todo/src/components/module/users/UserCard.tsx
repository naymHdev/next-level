import { IUser } from "@/types/types";

interface IProps {
  user: IUser;
}

const UserCard = ({ user }: IProps) => {
  return (
    <>
      <div className=" border px-5 py-3 rounded-md">
        <div className=" flex justify-between items-center">
          <div className=" flex gap-2 items-center">
            <h1>{user.name}</h1>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserCard;
