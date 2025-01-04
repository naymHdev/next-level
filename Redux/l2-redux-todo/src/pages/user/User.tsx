import AddUserModal from "@/components/module/users/AddUserModal";
import UserCard from "@/components/module/users/UserCard";
import { selectUsers } from "@/redux/features/user/userSlice";
import { useAppSelector } from "@/redux/hook";

const User = () => {
  const users = useAppSelector(selectUsers);

  return (
    <>
      <div className=" mx-auto max-w-7xl px-5 mt-20">
        <div className=" flex items-center justify-between">
          <h3 className=" font-bold text-lg">All Users:</h3>
          <AddUserModal />
        </div>

        <div className=" grid grid-cols-1 md:grid-cols-4 gap-6 mt-5">
          {users?.map((user) => (
            <UserCard user={user} key={user.id} />
          ))}
        </div>
      </div>
    </>
  );
};

export default User;
