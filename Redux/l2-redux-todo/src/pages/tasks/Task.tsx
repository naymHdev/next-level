import { AddTaskModal } from "@/components/module/tasks/AddTaskModal";
import TaskCard from "@/components/module/tasks/TaskCard";
import { selectTasks } from "@/redux/features/task/taskSlice";
import { useAppSelector } from "@/redux/hook";

const Task = () => {
  const tasks = useAppSelector(selectTasks);

  return (
    <>
      <div className=" mx-auto max-w-7xl px-5 mt-20">
        <div className=" flex items-center justify-between">
          <h3 className=" font-bold text-lg">My Task:</h3>
          <AddTaskModal />
        </div>

        <div className=" space-y-5 mt-5">
          {tasks?.map((task) => (
            <TaskCard task={task} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Task;
